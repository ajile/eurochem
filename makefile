REPORTER = dot

develop: node_install bower_install app_build test

app_build:
	gulp build

node_install:
	npm install

bower_install:
	bower install

test: test_server

test_server:
	gulp test

test_client:
	@NODE_ENV=test ./node_modules/jasmine-node/bin/jasmine-node \
		./client/test/spec/* \
		--growl \
		--color

test_server_watch: test_server --watch

.PHONY: test