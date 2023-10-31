.PHONY: dev
dev:
	air -- localhost:8080 ./site/dist

.PHONY: run
run: randomizer-embed
	./randomizer-embed localhost:8080 ./site/dist

randomizer-embed: build

.PHONY: build
build: build-site build-server

.PHONY: build-site
build-site: deps-site
	cd site; npm run build

.PHONY: deps-site
deps-site:
	cd site; npm i

.PHONY: build-server
build-server: deps-server
	go build

.PHONY: deps-server
deps-server:
	go get ./...
