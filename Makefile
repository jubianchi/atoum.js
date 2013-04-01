TESTS = test/*.js

tdd:
	@./bin/atoum tests --loop

test:
	@./bin/atoum tests

clean:
	@rm -rf ./coverage

coverage: clean
	@./node_modules/.bin/istanbul cover index.js -- tests/
