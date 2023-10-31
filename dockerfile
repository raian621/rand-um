FROM node:alpine as build_site
WORKDIR /src
ADD ./site /src
RUN npm i
RUN npm run build

FROM golang:1.21
WORKDIR /src
ADD . ./
RUN go build -o /bin/random-embedder
COPY --from=build_site /src/dist /src/site
ENV GIN_MODE=release
CMD ["/bin/random-embedder", "0.0.0.0:8080", "/src/site"]