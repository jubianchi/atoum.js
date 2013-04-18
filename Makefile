logo:
	@echo "                      http://atoum.org"
	@node_modules/.bin/picture-tube resources/images/logo.png --cols 60

egg:
	@echo "                               Happy Easter !!!"
	@node_modules/.bin/picture-tube resources/images/egg.png --cols 60

lint:
	@jshint --config jshintrc.json ./lib

test: clean logo
	@./bin/atoum -d tests --xunit --coverage

clean:
	@rm -rf ./lib-cov
	@rm -rf ./covershot
	@rm -rf ./doc/*
	@rm -f ./xunit.xml

coverage: clean
	@./bin/atoum --coverage=lib tests
	@mv -f ./covershot/* ./doc
	@rm -rf ./covershot
	@rm -rf ./lib-cov
	@open ./doc/index.html 2>/dev/null || google-chrome ./doc/index.html 2>/dev/null
