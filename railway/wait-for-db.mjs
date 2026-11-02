// Wait until the Postgres host in DATABASE_URL (or POSTGRES_HOST/PORT) accepts TCP connections.
import net from 'node:net'
let host = process.env.POSTGRES_HOST || 'postgres', port = Number(process.env.POSTGRES_PORT || 5432)
if (process.env.DATABASE_URL) { const u = new URL(process.env.DATABASE_URL); host = u.hostname; port = Number(u.port || 5432) }
const limit = Number(process.env.BOOKORBIT_RAILWAY_DB_WAIT_SECONDS || 180) * 1000, start = Date.now()
const ok = () => new Promise((r) => { const s = net.connect({ host, port, timeout: 3000 }); s.once('connect', () => { s.destroy(); r(true) }); s.once('error', () => r(false)); s.once('timeout', () => { s.destroy(); r(false) }) })
while (!(await ok())) {
  if (Date.now() - start > limit) { console.error(`[railway] Postgres ${host}:${port} not reachable after ${limit / 1000}s`); process.exit(1) }
  console.log(`[railway] waiting for Postgres at ${host}:${port}...`); await new Promise((r) => setTimeout(r, 2000))
}
console.log(`[railway] Postgres at ${host}:${port} is reachable`)
