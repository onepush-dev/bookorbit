#!/bin/sh
# Railway start wrapper for BookOrbit.
set -e
mkdir -p /data/books
node /app/wait-for-db.mjs
exec sh /app/entrypoint.sh
