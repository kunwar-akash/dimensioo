import { spawn } from 'node:child_process'

const flags = process.argv.slice(2).filter(flag => flag !== '--strictPort').map(flag => flag === '--host' ? '--hostname' : flag)
const next = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', ...flags], { stdio: 'inherit' })
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => next.kill(signal))
next.on('exit', code => { process.exitCode = code ?? 1 })
