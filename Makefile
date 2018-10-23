run:
	npm run babel-node src/bin/calc.js

debug-console:
	npm run gulp debugConsole



install:
	npm install

build:
	rm -rf dist
	npm run build

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

watch-test:
	npm test -- --watch --notify
