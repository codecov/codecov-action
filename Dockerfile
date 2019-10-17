# Codecov @codecov

FROM debian:stretch-slim

RUN apt-get update && apt-get install -y \
		ca-certificates \
		curl \
		git \
		mercurial \
	--no-install-recommends && rm -r /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
