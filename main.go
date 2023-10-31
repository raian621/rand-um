package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) != 4 {
		fmt.Printf("Usage: %s <hostname> <site directory> <protocol(http|https)>", os.Args[0])
		os.Exit(1)
	}

	hostname := os.Args[1]
	siteDir := os.Args[2]
	protocol := os.Args[3]

	StartServer(hostname, siteDir, protocol)
}
