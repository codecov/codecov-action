deploy:
	$(eval VERSION := $(shell cat package.json | grep '"version": ' | cut -d\" -f4))
	git tag -d v4
	git push origin :v4
	git tag v4
	git tag v$(VERSION) -s -m ""
	git push origin --tags
