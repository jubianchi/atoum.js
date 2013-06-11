ifndef $(TARGET)
	TARGET=$(shell echo $(TAG) | awk -F. -v OFS=. 'NF==1{print ++$$NF}; NF>1{if(length($$NF+1)>length($$NF))$$(NF-1)++; $$NF=sprintf("%0*d", length($$NF), ($$NF+1)%(10^length($$NF))); print}')
endif
SEDEXPR="s/\"version\": \".*\",/\"version\": \"${TARGET}\",/"

logo:
	@which picture-tube > /dev/null 2>&1 && echo "                       http://atoum.org" || true
	@which picture-tube > /dev/null 2>&1 && picture-tube resources/images/logo.png --cols 60  || true

egg:
	@which picture-tube > /dev/null 2>&1 && echo "                               Happy Easter !!!" || true
	@which picture-tube > /dev/null 2>&1 && picture-tube resources/images/egg.png --cols 60 || true

clean:
	@rm -rf ./lib-cov
	@rm -rf ./covershot
	@rm -f ./xunit.xml

lint: clean
	@jshint --config jshintrc.json ./lib

test: clean logo
	@./bin/atoum -d tests --xunit

loop: clean
	@while true; \
	do \
		make test; \
		echo "Press <Enter> to reexecute, press any other key and <Enter> to stop..."; \
		read userinput; \
		test ! -z $$userinput && exit 0; \
	done

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

tag: doc-commit
	@test ! -z $(TAG) || (echo "Usage: make tag TAG=X.X.X" && exit 1)
	@git tag v$(TAG)
	@cd doc && git push origin gh-pages:gh-pages
	@git push origin master:master --tags
	@npm publish
	@sed -i "" ${SEDEXPR} ./package.json
	@git add ./package.json
	@git commit -m"Bump version to ${TARGET}"
	@git push origin master:master
