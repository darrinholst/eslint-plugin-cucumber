#!/bin/sh

node tests/lib/rules/async-then.js && \
node tests/lib/rules/no-restricted-tags.js && \
node tests/lib/rules/no-arrow-functions.js