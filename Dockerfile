# Codecov @codecov

FROM ubuntu:latest

WORKDIR /app
COPY . /app

RUN apt update && apt install -y curl

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
