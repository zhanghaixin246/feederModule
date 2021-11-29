package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	//curl -X POST -d "message=123" http://localhost:8123
	router.POST("/", func(c *gin.Context) {
		message := c.PostForm("message")
		fmt.Println("message: ", message)
		c.JSON(200, gin.H{
			"status":  "posted",
			"message": message,
		})
	})

	router.Run(":8123")
}
