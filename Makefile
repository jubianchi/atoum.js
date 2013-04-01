TESTS = test/*.js

tdd:
	./bin/atoum tests --loop;

test:
	./bin/atoum tests;
