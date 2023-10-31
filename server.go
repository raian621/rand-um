package main

import (
	"errors"
	"fmt"
	"html/template"
	"math/rand"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func StartServer(host string) {
	router := gin.Default()

	apiEngine := getApiEngine()
	staticEngine := getStaticEngine()

	router.GET("/*any", func(ctx *gin.Context) {
		fmt.Println(ctx.Request.URL.Path)

		if match, _ := regexp.Match(`/.+/r.*`, []byte(ctx.Request.URL.Path)); match {
			fmt.Println("matched")
			apiEngine.HandleContext(ctx)
		} else {
			staticEngine.HandleContext(ctx)
		}
	})

	router.Run("0.0.0.0:8080")
}

func getApiEngine() *gin.Engine {
	apiEngine := gin.New()
	apiGroup := apiEngine.Group("/:id/r")
	apiGroup.GET("/", func(ctx *gin.Context) {
		fmt.Println("/random requested")
		var randomValue string

		fmt.Println("loading query values")
		queryMap := make(map[string]string)
		ctx.BindQuery(&queryMap)
		randomValue, err := runQuery(&queryMap)
		checkError(err)

		sendRandomOgpEmbed(ctx, randomValue)

		ctx.Header("Content-Type", "text/html")
		fmt.Println("parsing templates")

		checkError(err)
	})
	return apiEngine
}

func getStaticEngine() *gin.Engine {
	staticEngine := gin.New()
	staticEngine.Static("/", "./site/dist")
	return staticEngine
}

func runQuery(queryMap *map[string]string) (randomValue string, err error) {
	var hasQuery bool

	if val, ok := (*queryMap)["list"]; ok {
		hasQuery = true
		elements := strings.Split(val, ",")
		fmt.Println(elements)

		r := rand.Intn(int(len(elements)))

		if err == nil {
			randomValue = elements[r]
		}
	}

	if val, ok := (*queryMap)["range"]; ok {
		hasQuery = true
		elements := strings.Split(val, ",")

		start, _err := strconv.ParseInt(elements[0], 10, 64)
		err = errors.Join(err, _err)
		end, _err := strconv.ParseInt(elements[1], 10, 64)
		err = errors.Join(err, _err)

		r := rand.Intn(int(end - start))
		err = errors.Join(err, _err)

		if err == nil {
			randomValue = fmt.Sprint(r + int(start))
		}
	}

	if !hasQuery {
		err = errors.New("no query parameters")
	}

	return randomValue, err
}

func sendRandomOgpEmbed(ctx *gin.Context, randomValue string) error {
	tmpl, err := template.ParseFiles("templates/ogp.tmpl")
	checkError(err)
	data := OgpFields{
		Type:        "website",
		Title:       "Random Value:",
		Description: randomValue,
	}

	fmt.Println("sending response")
	ctx.Status(http.StatusOK)
	return tmpl.Execute(ctx.Writer, data)
}
