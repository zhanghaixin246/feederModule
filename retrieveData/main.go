package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	url "net/url"
	"regexp"
	"strings"
	"time"
)

// 获取网站gas price
func GetPrice(url string) (albDate string, price string) {
	// 获取网站数据
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("http.Get error : ", err)
		//os.Exit(-1)
		return
	}
	defer resp.Body.Close()

	// 去读数据内容为 bytes
	dataBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("ioutil.ReadAll error : ", err)
		//os.Exit(-1)
		return
	}

	// 字节数组 转换成 字符串
	str := string(dataBytes)
	//fmt.Println(str)

	//获取数据方式：1、当前日前的前一天 2、最新的price（null的前一个）
	var rePrice string
	var n int
	t := time.Now()
	//yesTime := t.AddDate(0,0,-1)
	//fmt.Println("Location:", t.Location(), ":Time:", t)
	//fmt.Println("t ShortMonth : ", t.Format("2006-Jan-02"))
	//fmt.Println("yesTime ShortMonth : ", yesTime.Format("2006-Jan-02"))

	alb, err := time.LoadLocation("America/Edmonton")
	if err != nil {
		fmt.Println("err: ", err.Error())
		//os.Exit(-1)
		return
	}
	albDate = t.In(alb).AddDate(0, 0, -1).Format("2006-Jan-02")
	fmt.Println("alb Location:", alb, ":Time:", t.In(alb))
	fmt.Println("albDate : ", albDate)
	dateArr := strings.Split(albDate, "-")
	reStr := dateArr[2] + "-" + dateArr[1]
	//fmt.Println(reStr)
	//rePrice = `01-Aug-21\',[0-9.]+,((\d+).(\d+))`
	rePrice = reStr + `-21\',[0-9.]+,((\d+).(\d+))`
	fmt.Println("rePrice:", rePrice)
	n = 1
	results := findMatch(rePrice, str, n)
	fmt.Println("results:", results)
	//fmt.Println(len(results))
	if len(results) > 0 {
		price = results[0][1]
		fmt.Println("price :", price)
		return
	}
	if price != "" {
		return
	}
	fmt.Println("yesterday price not match ！")

	// 获取最新price
	rePrice = `[\d+]-[a-zA-Z]{3}-[0-9]+\',[0-9.]+,([0-9]+.[0-9]+|null)`
	n = -1
	results = findMatch(rePrice, str, n)
	key := getLastPriceKey(results)
	if key == 0 {
		fmt.Println("latest price not match ！")
		//os.Exit(-1)
		return
	}
	price = results[key-1][1]

	fmt.Println("price :", price)

	return
}
func findMatch(rePrice, str string, n int) (results [][]string) {
	// 过滤 price
	re := regexp.MustCompile(rePrice)
	// 匹配多少次， -1 默认是全部
	return re.FindAllStringSubmatch(str, n)
}
func getLastPriceKey(res [][]string) (price int) {
	if len(res) <= 0 {
		fmt.Println("latest price not match ！")
		//os.Exit(-1)
		return
	}
	for k, result := range res {
		for _, vv := range result {
			//fmt.Println("kk:",kk)
			//fmt.Println("vv:",vv)
			if vv == "null" {
				//fmt.Println("null kk :",kk)
				//fmt.Println("null k:", k)
				return k
			}
		}
	}
	return
}
func main() {
	// 简单设置log 参数
	//log.SetFlags(log.Lshortfile)
	// 传入爬取数据网站地址
	grabUrl := "https://www.gasalberta.com/gas-market/market-prices"
	// 上报的地址
	reqUrl := "http://localhost:8123"
	// 设置请求间隔
	t := time.Tick(3 * time.Second)
	for {
		select {
		case <-t:
			// 抓取数据，请求
			fmt.Println("\n t定时器")

			date, price := GetPrice(grabUrl)
			message := fmt.Sprintf("%s:%s", date, price)
			fmt.Println("message: ", message)

			data := url.Values{"message": {message}}

			response, err := http.PostForm(reqUrl, data)
			fmt.Println("response: ", response)
			fmt.Println("err: ", err)
		}
	}
}
