FROM node:alpine as build_site
LABEL stage=build_react_site
WORKDIR /src
ARG VITE_TENOR_API_KEY
ENV VITE_TENOR_API_KEY $VITE_TENOR_API_KEY
RUN echo $VITE_TENOR_API_KEY
ADD ./site /src
RUN test -n "$VITE_TENOR_API_KEY"
RUN npm i
RUN npm run build

FROM golang:1.21
WORKDIR /src
ADD ./server /src
RUN go build -o /bin/random-embedder
COPY --from=build_site /src/dist /src/site
ENV GIN_MODE=release
CMD ["/bin/random-embedder", "-host=0.0.0.0", "-port=8000", "-static=/src/site", "-protocol=http"]