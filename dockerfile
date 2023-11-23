FROM node:alpine as build_site
WORKDIR /src
ADD ./site /src
RUN npm i
RUN npm run build

FROM golang:1.21
WORKDIR /src
ADD ./server /src
RUN ls -R
RUN go build -o /bin/random-embedder
COPY --from=build_site /src/dist /src/site
ENV GIN_MODE=release
CMD ["/bin/random-embedder", "-host=0.0.0.0", "-port=8000", "-static=/src/site", "-protocol=http"]