logo:
	@echo "                      http://atoum.org"
	@node_modules/.bin/picture-tube resources/images/logo.png --cols 60

egg:
	@echo "                               Happy Easter !!!"
	@node_modules/.bin/picture-tube resources/images/egg.png --cols 60

lint:
	@jshint --config jshintrc.json ./lib

tdd: logo
	@./bin/atoum tests --loop

test: logo
	@./bin/atoum tests --xunit=xunit.xml

clean:
	@rm -rf ./doc/*

coverage: clean
	@./node_modules/.bin/istanbul cover --root lib bin/atoum -- tests
	@cp -rf ./coverage/lcov-report/* ./doc
	@rm -rf ./coverage
	@open ./doc/index.html
