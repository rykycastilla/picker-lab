import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Resolves the absolute path relative to the module file
 * @param { string } pathTo
 * @param { string } metaUrl  `import.meta.url` value from the usage module
 * @returns { string }
 */
export function genPath( pathTo, metaUrl ) {
  const __filename = fileURLToPath( metaUrl )
  const __dirname = dirname( __filename )
  return resolve( __dirname, pathTo )
}
