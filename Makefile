logo:
	@echo "                      http://atoum.org"
	@node_modules/.bin/picture-tube resources/images/logo.png --cols 60

egg:
	@echo "                               Happy Easter !!!"
	@node_modules/.bin/picture-tube resources/images/egg.png --cols 60

tdd: logo
	@./bin/atoum tests --loop

test: logo
	@./bin/atoum tests

clean:
	@rm -rf ./coverage

coverage: clean
	@./node_modules/.bin/istanbul cover --root lib bin/atoum -- tests
	@cp -rf ./coverage/lcov-report ./doc
	@rm -rf ./coverage
	@open ./doc/index.html
