# Codecov @codecov

FROM alpine:3.10

WORKDIR /app
COPY . /app

RUN apk add --no-cache curl bash git

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]