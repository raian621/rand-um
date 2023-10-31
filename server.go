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

func StartServer(host, siteDir, protocol string) {
	router := gin.Default()

	apiEngine := getApiEngine()
	staticEngine := getStaticEngine(siteDir)

	router.GET("/*any", func(ctx *gin.Context) {
		if match, _ := regexp.Match(`/.+/r.*`, []byte(ctx.Request.URL.Path)); match {
			apiEngine.HandleContext(ctx)
		} else {
			staticEngine.HandleContext(ctx)
		}
	})

	fmt.Printf("Hosting server on %s://%s\n", protocol, host)
	router.Run(host)
}

func getApiEngine() *gin.Engine {
	apiEngine := gin.New()
	apiGroup := apiEngine.Group("/:id/r")
	apiGroup.GET("/", func(ctx *gin.Context) {
		queryMap := make(map[string]string)
		ctx.BindQuery(&queryMap)
		ogpFields, err := runQuery(&queryMap)
		checkError(err)

		sendRandomOgpEmbed(ctx, ogpFields)
		ctx.Header("Content-Type", "text/html")
		checkError(err)
	})
	return apiEngine
}

func getStaticEngine(siteDir string) *gin.Engine {
	staticEngine := gin.New()
	staticEngine.Static("/", siteDir)
	return staticEngine
}

func runQuery(queryMap *map[string]string) (ogpFields *OgpFields, err error) {
	var hasQuery bool

	ogpFields = &OgpFields{
		Type:  "website",
		Title: "Random Value:",
	}

	if val, ok := (*queryMap)["list"]; ok {
		hasQuery = true
		elements := strings.Split(val, ",")

		r := rand.Intn(int(len(elements)))

		if err == nil {
			ogpFields.Description = elements[r]
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
			ogpFields.Description = fmt.Sprint(r + int(start))
		}
	}

	if !hasQuery {
		err = errors.New("no query parameters")
	}

	return ogpFields, err
}

func sendRandomOgpEmbed(ctx *gin.Context, ogpFields *OgpFields) error {
	tmpl, err := template.ParseFiles("templates/ogp.tmpl")
	checkError(err)

	ctx.Status(http.StatusOK)
	return tmpl.Execute(ctx.Writer, ogpFields)
}
