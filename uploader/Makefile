all:

clean:
	rm -rf node_modules
	rm -rf out
	rm -rf coverage
	rm -rf .nyc_output

install:
	npm install

test: 
	rm -rf coverage
	rm -rf .nyc_output
	npm test
	
build: 
	rm -rf out
	rm -rf dist
	npm run build-linux
	npm run build-macos

.PHONY: clean install test build
