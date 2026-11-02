# BookOrbit on Railway: the official image (pinned by digest) plus a start wrapper that
# waits for Postgres, prepares /data/books on the volume, then runs upstream's entrypoint
# (migrations + server, dropping to PUID/PGID 1000).
FROM ghcr.io/bookorbit/bookorbit:3.6.0@sha256:bbb5da52e96dbbff1dd36f55454f9845e6cde264b4b3428a3ea783124a4ca62e
LABEL org.opencontainers.image.source="https://github.com/onepush-dev/bookorbit" \
      org.opencontainers.image.licenses="AGPL-3.0-only"
COPY --chmod=755 railway/railway-start.sh /app/railway-start.sh
COPY --chmod=644 railway/wait-for-db.mjs /app/wait-for-db.mjs
# Railway has one volume per service, mounted at /data: libraries live in /data/books.
ENV LIBRARY_BROWSE_ROOT=/data \
    TZ=UTC
CMD ["sh", "/app/railway-start.sh"]
