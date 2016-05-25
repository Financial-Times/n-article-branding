include n.Makefile

unit-test:
	mocha tests/*

test: verify unit-test
