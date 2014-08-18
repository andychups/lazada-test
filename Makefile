.DEFAULT_GOAL = all

NODE_MODULES = node_modules
BOWER = libs

.PHONY: all
all:: dependency
all:: build

.PHONY: build
build::
	./node_modules/enb/bin/enb make --no-cache

.PHONY: dependency
dependency:: $(NODE_MODULES)
dependency:: $(BOWER)

$(NODE_MODULES)::
	npm install

$(BOWER)::
	bower install

.PHONY: test
test::
	echo "testihuiesti"