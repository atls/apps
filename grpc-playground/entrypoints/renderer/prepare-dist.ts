import { cp }            from 'node:fs/promises'
import { mkdir }         from 'node:fs/promises'
import { readFile }      from 'node:fs/promises'
import { readdir }       from 'node:fs/promises'
import { rm }            from 'node:fs/promises'
import { writeFile }     from 'node:fs/promises'
import { dirname }       from 'node:path'
import { join }          from 'node:path'
import { relative }      from 'node:path'
import { sep }           from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const source = join(root, 'src', '.next')
const destination = join(root, 'dist')
const excludedDirectories = new Set([
  'cache',
  'dev',
  'diagnostics',
  'node_modules',
  'standalone',
  'types',
])
const excludedFiles = new Set(['required-server-files.js', 'trace', 'trace-build'])

await rm(destination, { recursive: true, force: true })
await mkdir(destination, { recursive: true })
await cp(source, join(destination, '.next'), {
  recursive: true,
  filter: (path) => {
    const parts = relative(source, path).split(sep)

    return (
      !excludedDirectories.has(parts[0]) && !excludedFiles.has(parts[0]) && !path.endsWith('.map')
    )
  },
})

const requiredServerFilesPath = join(destination, '.next', 'required-server-files.json')
const requiredServerFiles = JSON.parse(await readFile(requiredServerFilesPath, 'utf8')) as {
  appDir: string
  config: {
    outputFileTracingRoot?: string
    repoRoot?: string
    turbopack?: unknown
  }
}

requiredServerFiles.appDir = '.'
delete requiredServerFiles.config.outputFileTracingRoot
delete requiredServerFiles.config.repoRoot
delete requiredServerFiles.config.turbopack
await writeFile(requiredServerFilesPath, JSON.stringify(requiredServerFiles))

const staticRoot = join(destination, '.next', 'static')
const mediaFiles = await readdir(join(staticRoot, 'media'))

const fixFontUrls = async (directory: string): Promise<void> => {
  const entries = await readdir(directory, { withFileTypes: true })

  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name)

      if (entry.isDirectory()) {
        await fixFontUrls(path)
      } else if (entry.name.endsWith('.css')) {
        const css = await readFile(path, 'utf8')
        const fixed = css.replace(
          /url\((['"]?)(\/@fs\/[^'"()]+\/([^/'"()]+\.(?:ttf|otf|woff2?)))\1\)/g,
          (_, quote: string, __: string, name: string) => {
            const dot = name.lastIndexOf('.')
            const matches = mediaFiles.filter(
              (file) => file.startsWith(`${name.slice(0, dot)}.`) && file.endsWith(name.slice(dot))
            )

            if (matches.length !== 1) {
              throw new Error(`Expected one built font asset for ${name}; found ${matches.length}`)
            }

            return `url(${quote}/_next/static/media/${matches[0]}${quote})`
          }
        )

        if (fixed.includes('/@fs/')) {
          throw new Error(`Unresolved local asset URL in ${relative(destination, path)}`)
        }

        if (fixed !== css) {
          await writeFile(path, fixed)
        }
      }
    })
  )
}

await fixFontUrls(staticRoot)

const workspaceRoot = join(root, '../../..')
const assertPortable = async (directory: string): Promise<void> => {
  const entries = await readdir(directory, { withFileTypes: true })

  await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name)

      if (entry.isDirectory()) {
        await assertPortable(path)
      } else if (entry.isFile()) {
        const content = await readFile(path)

        if (content.includes(workspaceRoot) || content.includes('/@fs/')) {
          throw new Error(`Local build path in ${relative(destination, path)}`)
        }
      } else {
        throw new Error(`Unexpected entry in ${relative(destination, path)}`)
      }
    })
  )
}

await assertPortable(destination)
