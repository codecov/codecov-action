deploy:
	$(eval VERSION := $(shell cat package.json | grep '"version": ' | cut -d\" -f4))
	git tag -d v2
	git push origin :v2
	git tag v2
	git tag v$(VERSION) -m ""
	git push origin --tags
