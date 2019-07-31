FROM debian:9.5-slim

LABEL "com.github.actions.name"="Codecov"
LABEL "com.github.actions.description"="Upload coverage reports to codecov"
LABEL "com.github.actions.icon"="umbrella"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/ibrahim0814/github-actions-test.git"
LABEL "homepage"="https://www.codecov.io"
LABEL "maintainer"="Ib <ibrahim@codecov.io>"

RUN apt-get install bash-completion
RUN apt-get install git-all
RUN apt-get install curl

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]