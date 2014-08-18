.DEFAULT_GOAL = all

NODE_MODULES = node_modules
BOWER = libs

.PHONY: all
all:: build

.PHONY: build
build:: ./node_modules/enb/bin/enb make --no-cache

$(NODE_MODULES)::
	npm install

$(BOWER)::
	bower install

