logo:
	@echo "                     http://atoum.org"
	@node_modules/.bin/picture-tube resources/images/logo.png --cols 60

egg:
	@echo "                            Happy Easter !!!"
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

analysis: clean
	@test -d doc/plato || mkdir -p doc/plato
	@plato -r -d doc/plato -l jshintrc.json -t 'atoum.js source analysis' lib

doc: clean covershot analysis
	@cp -rf covershot/* doc
	@rm -rf covershot doc/data
	@open doc/index.html 2>/dev/null || google-chrome doc/index.html 2>/dev/null
	@open doc/plato/index.html 2>/dev/null || google-chrome doc/plato/index.html 2>/dev/null

doc-commit: doc
	@cd doc && git checkout gh-pages && git add . && git commit -m"Update documentation"
	@git add doc && git commit -m"Update documentation" -n

doc-push: doc-commit
	@cd doc && git push origin gh-pages:gh-pages
	@git push origin master:master
