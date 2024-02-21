package main

import (
	"crypto/tls"
	"flag"
)

func main() {
	var host, port, siteDir, protocol, certfile, keyfile string
	var saveCerts bool

	flag.StringVar(&host, "host", "0.0.0.0", "Address to host the server at")
	flag.StringVar(&port, "port", "8000", "TCP port to listen on")
	flag.StringVar(&siteDir, "static", "../site/dist", "Path to files used for website")
	flag.StringVar(&protocol, "protocol", "http", "Protocol to use on the server")
	flag.StringVar(&certfile, "cert", "", "Path to cert file")
	flag.StringVar(&keyfile, "key", "", "Path to key file")
	flag.BoolVar(&saveCerts, "save", false, "Save generated certs")
	flag.Parse()

	var tlsConfig *tls.Config
	var err error
	if protocol == "https" {
		// generate self signed certs
		if keyfile == "" && certfile == "" {
			tlsConfig, err = GenerateSelfSignedCerts(saveCerts)
			if err != nil {
				panic(err)
			}
		} else {
			if tlsConfig, err = LoadTLSConfig(keyfile, certfile); err != nil {
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
