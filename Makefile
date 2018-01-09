NODE_PATH := ./src

.PHONY: test

test:
	NODE_ENV=testing ./node_modules/mocha/bin/mocha -w **/*_test.js

sync_test_db:
	touch /tmp/cad_sql.dump
	mysqldump -u dbradley -p -d ctrlaltdebate > /tmp/cad_sql.dump
	cat /tmp/cad_sql.dump | mysql -u dbradley -p -D ctrlaltdebate_testing
