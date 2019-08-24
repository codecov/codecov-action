# Codecov @codecov

FROM ubuntu:latest

WORKDIR /app
COPY . /app

RUN sudo apt update && sudo apt install -y curl

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
