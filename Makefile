deploy:
	$(eval VERSION := $(shell cat src/version | grep 'CODECOV_ACTION_VERSION=' | cut -d\" -f2))
	git tag -d v5
	git push origin :v5
	git tag v5
	git tag v$(VERSION) -s -m ""
	git push origin --tags
