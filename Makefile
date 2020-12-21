deploy:
	$(eval VERSION := $(shell cat package.json | grep '"version": ' | cut -d\" -f4))
	git tag -d v1
	git push origin :v1
	git tag v1
	git tag v$(VERSION) -m ""
	git push origin --tags
