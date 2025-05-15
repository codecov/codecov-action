deploy:
	$(eval VERSION := $(shell cat src/version))
	git tag -d v6
	git push origin :v6
	git tag v6
	git tag v$(VERSION) -s -m ""
	git push origin --tags
