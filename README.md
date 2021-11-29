# Feeder Module 

## retrieveData (by Zhangheng trustslink.com)

### 天然气定价使用`daily price`，可以从当地政府网站爬取前一天价格
### 石油定价使用`monthly price`，可以从APi获取
```
以上参考文档为：Oil and Gas Pricing Process_ Beijing July 29th Feedback.docx
```


### 从政府网站获取`gas市场价格`
[网址](https://www.gasalberta.com/gas-market/market-prices) : https://www.gasalberta.com/gas-market/market-prices

> 获取数据图表为：Alberta Natural Gas Prices - Current Month；默认尝试获取 Albertans 时区，前一天的 price ；如果没有获取到，则获取最新的price（null之前的最后一个）。
![](pic/price.png)

### 接口测试文档
[地址](https://docs.apipost.cn/preview/948bf7ac63e2254d/7775b9b2f2ce3543)



## gateway (by ChrisChiu trustslink.com)

- how to use
```shell
# 1. set ./gateway/config/config.js
# include contractAddress and osm module abi file path
# 2 install package
npm install
# 3 start gatewau
node ./index.js 
```

- api http://yapi.trustslink.com:53000/project/144/interface/api


_trustslink.com 2021_
