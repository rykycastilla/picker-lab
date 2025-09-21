import { exec, spawn } from 'node:child_process'
import { checkFileExists } from '../libs/node/check_file_exists.js'
import { genPath } from '../libs/node/gen_path.js'
import { listDir } from '../libs/node/list_dir.js'
import { resolve } from 'node:path'
import { styleText } from 'node:util'

async function main() {
  // Filtering (only allow MacOS)
  if( process.platform !== 'darwin' ) { return }
  // Detecting swiftlint
  const swiftLintExists = await checkSwiftLint()
  if( !swiftLintExists ) {
    console.log( styleText(
      [ 'yellow' ], 'WARNING:' ),
    'SwiftLint does not exists in the system. Please, install it to lint MacOS libs',
    )
    return
  }
  // Searching for native swift libraries
  const macLibsPath = genPath( '../libs/macos', import.meta.url )
  const libDirList = await listDir( macLibsPath )
  for( const libDir of libDirList  ) {
    // Resolving linter config
    const libPath = resolve( macLibsPath, libDir )
    const libLinterConfig = resolve( libPath, '.swiftlint.yml' )
    const linterConfigExists = await checkFileExists( libLinterConfig )
    // Linting
    if( linterConfigExists ) { await lint( libPath ) }
  }
}

/**
 * @returns { Promise<boolean> }  `swiftlint` exists
 */
function checkSwiftLint() {
  return new Promise( ( resolve ) => {
    exec( 'swiftlint --version', ( error ) => {
      resolve( error === null )
    } )
  } )
}

/**
 * @param { string } path
 * @returns { Promise<void> }
 */
function lint( path ) {
  return new Promise( ( resolve ) => {
    const lintingProcess = spawn( 'swiftlint', [ 'lint' ], { stdio:'inherit', cwd:path } )
    lintingProcess.on( 'close', () => resolve() )
  } )
}

main()
