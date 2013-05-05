logo:
	@echo "                      http://atoum.org"
	@node_modules/.bin/picture-tube resources/images/logo.png --cols 60

egg:
	@echo "                               Happy Easter !!!"
	@node_modules/.bin/picture-tube resources/images/egg.png --cols 60

clean:
	@rm -rf ./lib-cov
	@rm -rf ./covershot
	@rm -f ./xunit.xml

lint:
	@jshint --config jshintrc.json ./lib

test: clean logo
	@./bin/atoum -d tests --xunit

covershot: clean logo
	@./bin/atoum -d tests --coverage

doc: clean covershot
	@git submodule update
	@rm -rf doc/*
	@mv -f covershot/* doc
	@rm -rf covershot doc/data
	@cd doc && git checkout gh-pages && git add . && git commit -m"Update documentation"
	@cd ..
	@git add doc
	@git commit -m"Update documentation" -n
	@open doc/index.html 2>/dev/null || google-chrome doc/index.html 2>/dev/null
