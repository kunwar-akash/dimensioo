import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { spawnSync } from 'node:child_process'

const types = {
  '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.txt': 'text/plain', '.webp': 'image/webp', '.woff2': 'font/woff2',
}
const root = '.open-next/assets'
const assets = {}
for (const file of await readdir(root, { recursive: true, withFileTypes: true })) {
  if (!file.isFile() || file.name.startsWith('.') || file.name === 'BUILD_ID') continue
  const path = join(file.parentPath, file.name)
  assets['/' + path.slice(root.length + 1)] = [types[extname(path)] || 'application/octet-stream', (await readFile(path)).toString('base64')]
}

// Sites accepts a self-contained Worker. Supply the asset binding normally created by Wrangler.
await writeFile('.open-next/sites-entry.mjs', `
import next from './worker.js'
const manifest = ${JSON.stringify(assets)}
const staticFiles = {
  async fetch(input) {
    const path = new URL(typeof input === 'string' ? input : input.url || input.href).pathname
    const entry = Object.hasOwn(manifest, path) ? manifest[path] : undefined
    if (!entry) return new Response(null, { status: 404 })
    const [type, base64] = entry
    return new Response(input.method === 'HEAD' ? null : Uint8Array.fromBase64(base64), {
      headers: { 'Content-Type': type, 'Cache-Control': path.startsWith('/_next/static/') ? 'public, max-age=31536000, immutable' : 'public, max-age=3600' }
    })
  }
}
export default {
  fetch(request, env, ctx) {
    const path = new URL(request.url).pathname
    if ((request.method === 'GET' || request.method === 'HEAD') && Object.hasOwn(manifest, path)) return staticFiles.fetch(request)
    return next.fetch(request, { ...env, ASSETS: env.ASSETS || staticFiles }, ctx)
  }
}
`)
await writeFile('.open-next/sites-wrangler.json', JSON.stringify({
  name: 'dimensioo',
  main: 'sites-entry.mjs',
  compatibility_date: '2026-10-01',
  compatibility_flags: ['nodejs_compat'],
}))
await mkdir('dist/server', { recursive: true })
const result = spawnSync(process.execPath, ['node_modules/wrangler/bin/wrangler.js', 'deploy', '--dry-run', '--config', '.open-next/sites-wrangler.json', '--outfile', '.open-next/sites-upload.multipart'], { stdio: 'inherit' })
if (result.status !== 0) process.exit(result.status || 1)
// Wrangler writes a multipart upload. Sites needs the executable module itself.
const payload = await readFile('.open-next/sites-upload.multipart')
const boundary = payload.subarray(2, payload.indexOf(13)).toString()
const upload = await new Response(payload, { headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` } }).formData()
const metadata = JSON.parse(upload.get('metadata'))
const worker = upload.get(metadata.main_module)
if (!(worker instanceof File)) throw new Error('Wrangler did not emit a Worker module.')
await writeFile('dist/server/index.js', Buffer.from(await worker.arrayBuffer()))
const check = spawnSync(process.execPath, ['--check', 'dist/server/index.js'], { stdio: 'inherit' })
if (check.status !== 0) process.exit(check.status || 1)
