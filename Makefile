TESTS = test/*.js

egg:
	@echo "                                  Happy Easter !!!"
	@node_modules/.bin/picture-tube resources/images/egg.png --cols 60

tdd:
	@./bin/atoum tests --loop

test:
	@./bin/atoum tests

clean:
	@rm -rf ./coverage

coverage: clean
	@./node_modules/.bin/istanbul cover index.js -- tests/
