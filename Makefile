deploy:
	$(eval VERSION := $(shell cat src/version))
	git tag -d v7
	git push origin :v7
	git tag v7
	git tag v$(VERSION) -s -m ""
	git push origin --tags
