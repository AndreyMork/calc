run:
	npx babel-node src/bin/calc.js

debug-console:
	npx gulp debugConsole



install:
	npm install

build:
	rm -rf dist
	npm run build

link:
	make build
	sudo npm link

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

log-test:
	DEBUG="calc*" npm test

watch-test:
	DEBUG="calc*" npm test -- --watch
