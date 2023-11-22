package main

import (
	"log"
)

type OgpFields struct {
	Type        string
	Title       string
	Description string
	URL         string
	ImageURL    string
}

func checkError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
