package main

import (
	"bytes"
	"crypto/rand"
	"crypto/rsa"
	"crypto/tls"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"math/big"
	"net"
	"os"
	"time"
)

func GenerateSelfSignedCerts(saveCerts bool) (tlsConfig *tls.Config, err error) {
	ca := &x509.Certificate{
		SerialNumber: big.NewInt(2019),
		Subject: pkix.Name{
			Organization:  []string{"rand-um"},
			Country:       []string{"US"},
			Province:      []string{""},
			Locality:      []string{"Dallas"},
			StreetAddress: []string{"Road Street"},
			PostalCode:    []string{"69420"},
		},
		NotBefore:             time.Now(),
		NotAfter:              time.Now().AddDate(10, 0, 0),
		IsCA:                  true,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageClientAuth, x509.ExtKeyUsageServerAuth},
		KeyUsage:              x509.KeyUsageDigitalSignature | x509.KeyUsageCertSign,
		BasicConstraintsValid: true,
	}

	caPrivKey, err := rsa.GenerateKey(rand.Reader, 4096)
	if err != nil {
		return nil, err
	}

	caBytes, err := x509.CreateCertificate(rand.Reader, ca, ca, &caPrivKey.PublicKey, caPrivKey)
	if err != nil {
		return nil, err
	}

	caPEM := new(bytes.Buffer)
	pem.Encode(caPEM, &pem.Block{
		Type:  "CERTIFICATE",
		Bytes: caBytes,
	})

	caPrivKeyPEM := new(bytes.Buffer)
	pem.Encode(caPrivKeyPEM, &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(caPrivKey),
	})

	cert := &x509.Certificate{
		SerialNumber: big.NewInt(2019),
		Subject: pkix.Name{
			Organization:  []string{"rand-um"},
			Country:       []string{"US"},
			Province:      []string{""},
			Locality:      []string{"Dallas"},
			StreetAddress: []string{"Road Street"},
			PostalCode:    []string{"69420"},
		},
		IPAddresses:  []net.IP{net.IPv4(127, 0, 0, 1), net.IPv6loopback},
		NotBefore:    time.Now(),
		NotAfter:     time.Now().AddDate(10, 0, 0),
		SubjectKeyId: []byte{1, 2, 3, 4, 6},
		ExtKeyUsage:  []x509.ExtKeyUsage{x509.ExtKeyUsageClientAuth, x509.ExtKeyUsageServerAuth},
		KeyUsage:     x509.KeyUsageDigitalSignature | x509.KeyUsageCertSign,
	}

	certPrivKey, err := rsa.GenerateKey(rand.Reader, 4096)
	if err != nil {
		return nil, err
	}

	certBytes, err := x509.CreateCertificate(rand.Reader, cert, ca, &certPrivKey.PublicKey, caPrivKey)
	if err != nil {
		return nil, err
	}

	// generate TLS signed certificate
	certPEM := new(bytes.Buffer)
	pem.Encode(certPEM, &pem.Block{
		Type:  "CERTIFICATE",
		Bytes: certBytes,
	})

	// generate TLS private key
	certPrivKeyPEM := new(bytes.Buffer)
	pem.Encode(certPrivKeyPEM, &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(certPrivKey),
	})

	if saveCerts {
		if certfile, err := os.Create("cert.pem"); err != nil {
			return nil, err
		} else {
			if _, err := certfile.Write(certPEM.Bytes()); err != nil {
				return nil, err
			}
		}

		if keyfile, err := os.Create("key.pem"); err != nil {
			return nil, err
		} else {
			if _, err := keyfile.Write(certPrivKeyPEM.Bytes()); err != nil {
				return nil, err
			}
		}
	}

	serverCert, err := tls.X509KeyPair(certPEM.Bytes(), certPrivKeyPEM.Bytes())
	if err != nil {
		return nil, err
	}

	tlsConfig = &tls.Config{
		Certificates: []tls.Certificate{serverCert},
	}

	return tlsConfig, nil
}

func LoadTLSConfig(keyfilePath, certfilePath string) (tlsConfig *tls.Config, err error) {
	if serverCert, err := tls.LoadX509KeyPair(certfilePath, keyfilePath); err != nil {
		return nil, err
	} else {
		tlsConfig = &tls.Config{
			Certificates: []tls.Certificate{serverCert},
		}
	}

	return tlsConfig, nil
}
