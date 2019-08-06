FROM alpine:3.10

WORKDIR /app
COPY . /app

RUN apk add --no-cache curl bash git

RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]