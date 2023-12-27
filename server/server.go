package main

import (
	"crypto/tls"
	"errors"
	"fmt"
	"html/template"
	"net/http"
	"randomizerembed/randomizer"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type ServerArgs struct {
	host      string
	port      string
	siteDir   string
	protocol  string
	tlsConfig *tls.Config
}

func StartServer(args *ServerArgs) {
	router := gin.Default()
	apiEngine := getApiEngine()                   // for api routes
	staticEngine := getStaticEngine(args.siteDir) // for serving website client

	router.GET("/*any", func(ctx *gin.Context) {
		if match, _ := regexp.Match(`/.+/r.*`, []byte(ctx.Request.URL.Path)); match {
			apiEngine.HandleContext(ctx)
		} else {
			staticEngine.HandleContext(ctx)
		}
	})

	var err error

	if args.protocol == "http" {
		fmt.Printf("Hosting server on %s://%s:%s\n", args.protocol, args.host, args.port)
		err = router.Run(fmt.Sprintf("%s:%s", args.host, args.port))
	} else if args.protocol == "https" {
		fmt.Printf("Hosting server on %s://%s:%s\n", args.protocol, args.host, args.port)

		server := http.Server{
			Addr:      fmt.Sprintf("%s:%s", args.host, args.port),
			TLSConfig: args.tlsConfig,
			Handler:   router.Handler(),
		}

		err = server.ListenAndServeTLS("", "")
	}

	if err != nil {
		fmt.Println(err)
	}
}

func getApiEngine() *gin.Engine {
	apiEngine := gin.New()
	apiGroup := apiEngine.Group("/:id/r")
	apiGroup.GET("", func(ctx *gin.Context) {
		queryMap := make(map[string]string)
		ctx.BindQuery(&queryMap)
		ogpFields, err := runQuery(&queryMap)
		checkError(err)
		err = sendRandomOgpEmbed(ctx, ogpFields)
		checkError(err)
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
		Type:  "object",
		Title: "Random Value:",
	}

	if val, ok := (*queryMap)["list"]; ok {
		hasQuery = true
		elements := strings.Split(val, ",")

		relement := randomizer.List(elements)

		if err == nil {
			ogpFields.Description = relement
		}
	}

	if val, ok := (*queryMap)["range"]; ok {
		hasQuery = true
		elements := strings.Split(val, ",")

		start, _err := strconv.ParseInt(elements[0], 10, 64)
		err = errors.Join(err, _err)
		end, _err := strconv.ParseInt(elements[1], 10, 64)
		err = errors.Join(err, _err)

		rvalue := randomizer.Range(int(start), int(end))

		if err == nil {
			ogpFields.Description = fmt.Sprint(rvalue)
		}
	}

	if val, ok := (*queryMap)["image"]; ok {
		hasQuery = true
		elements := strings.Split(val, ",")
		rurl := randomizer.List(elements)

		if err == nil {
			ogpFields.ImageURL = rurl
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
	ctx.Header("Last-Modified", time.Now().Format(http.TimeFormat))

	return tmpl.Execute(ctx.Writer, ogpFields)
}
