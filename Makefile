install:
	npm install

verify:
	obt verify

unit-test:
	mocha tests

test: verify unit-test
