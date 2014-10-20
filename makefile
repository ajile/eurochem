REPORTER = dot

test: test_server test_client

test_server:
	@NODE_ENV=test gulp test

test_client:
	@NODE_ENV=test ./node_modules/jasmine-node/bin/jasmine-node \
		./client/test/spec/* \
		--growl \
		--color

test_server_watch: test_server --watch

.PHONY: test