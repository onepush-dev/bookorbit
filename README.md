# BookOrbit on Railway: self-hosted digital library and reader with Kobo, KOReader and OPDS sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mFiKon)

[BookOrbit](https://github.com/bookorbit/bookorbit) (AGPL-3.0) is a self-hosted library for ebooks, comics and audiobooks: a web reader, metadata and covers, shelves, reading stats, Kobo sync, a KOReader plugin and OPDS. This template runs the official image with Postgres + pgvector, the way upstream's docker-compose does (the optional TTS / read-aloud workers are left out).

Image: `ghcr.io/onepush-dev/bookorbit:3.6.0` = official `ghcr.io/bookorbit/bookorbit:3.6.0` (pinned by digest) + a small start wrapper (waits for Postgres, creates `/data/books`, then runs upstream's entrypoint: migrations + server).

## Services
| Service | Image | Notes |
|---|---|---|
| BookOrbit | `ghcr.io/onepush-dev/bookorbit:3.6.0` | public HTTPS domain, health `/api/v1/health`, volume `/data` (covers, uploads, book dock, your libraries in `/data/books`) |
| Postgres | `pgvector/pgvector:0.8.7-pg18-trixie` | private, volume `/var/lib/postgresql/data` (extensions uuid-ossp, pg_trgm, unaccent, vector are created on first boot) |

## First run
Zero inputs. Open your Railway domain: BookOrbit shows its setup page. Paste the **setup token** from the BookOrbit service's `SETUP_BOOTSTRAP_TOKEN` variable, choose the owner username, email and password. The token only guards this one-time owner setup.

Then create a library pointing at `/data/books` (or a subfolder), and upload books from the web UI. Everything under `/data` is on the volume.

## Notes
- `APP_URL` follows your Railway domain (used for emails and Kobo endpoints); update it if you add a custom domain.
- Optional: `EMAIL_ENCRYPTION_KEY`, `MIGRATION_ENCRYPTION_KEY`, `BOOK_REQUEST_ENCRYPTION_KEY` (generate with `openssl rand -hex 32`) before storing SMTP, migration or download-client credentials; `LOG_LEVEL`; OIDC settings. See upstream [.env.example](https://github.com/bookorbit/bookorbit/blob/main/.env.example).
- Text-to-speech (Kokoro) and read-aloud workers are not included; add them later as extra services if you want them.

## License
BookOrbit is AGPL-3.0 with additional terms (see upstream `ADDITIONAL_TERMS.md`). This repo only holds Railway packaging (MIT).
