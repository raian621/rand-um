package main

import (
	"crypto/tls"
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 5 {
		fmt.Printf("Usage: %s <host> <port> <site directory> <protocol(http|https)> [keyfile] [certfile]", os.Args[0])
		os.Exit(1)
	}

	host := os.Args[1]
	port := os.Args[2]
	siteDir := os.Args[3]
	protocol := os.Args[4]

	var keyfilePath, certfilePath string
	if len(os.Args) > 5 && len(os.Args) != 7 {
		fmt.Printf("Usage: %s <host> <port> <site directory> <protocol(http|https)> [keyfile] [certfile]", os.Args[0])
		os.Exit(1)
	} else if len(os.Args) == 7 {
		keyfilePath = os.Args[5]
		certfilePath = os.Args[6]
	}

	var tlsConfig *tls.Config
	var err error
	if protocol == "https" {
		// generate self signed certs
		if keyfilePath == "" && certfilePath == "" {
			tlsConfig, err = GenerateSelfSignedCerts()
			if err != nil {
				panic(err)
			}
		} else {
			if tlsConfig, err = LoadTLSConfig(keyfilePath, certfilePath); err != nil {
				panic(err)
			}
		}
	}

	StartServer(&ServerArgs{
		host:      host,
		port:      port,
		siteDir:   siteDir,
		protocol:  protocol,
		tlsConfig: tlsConfig,
	})
}
