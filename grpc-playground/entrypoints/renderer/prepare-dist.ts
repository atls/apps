import { cp }            from 'node:fs/promises'
import { mkdir }         from 'node:fs/promises'
import { rm }            from 'node:fs/promises'
import { dirname }       from 'node:path'
import { join }          from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const source = join(root, 'src', '.next')
const destination = join(root, 'dist')

await rm(destination, { recursive: true, force: true })
await mkdir(destination, { recursive: true })
await cp(source, join(destination, '.next'), {
  recursive: true,
  filter: (path) => path !== join(source, 'cache') && path !== join(source, 'standalone'),
})
