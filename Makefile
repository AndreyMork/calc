run:
	npx babel-node src/bin/calc.js

debug-console:
	npx gulp debugConsole



install:
	npm install

build:
	rm -rf dist
	npm run build

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

log-test:
	DEBUG="calc*" npm test

test-coverage:
	npm test -- --coverage

watch-test:
	DEBUG="calc*" npm test -- --watch
