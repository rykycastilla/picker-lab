import { checkFileExists } from '../libs/node/check_file_exists.js'
import { checkIsMain } from '../libs/node/check_is_main.js'
import { genPath } from '../libs/node/gen_path.js'
import { LibCompiler } from '../libs/node/LibCompiler.js'
import { resolve } from 'node:path'
import { Xcode } from '../libs/node/Xcode/index.js'

/**
 * @param { string[] } args
 */
async function main( ...args ) {
  await linkMacLibs( ...args )
}

/**
 * @extends { LibCompiler<Xcode> }
 */
class MacLibCompiler extends LibCompiler {

  /** @public @readonly */ static RECOMMENDED_XCODE_VERSION = 16
  /** @readonly */ outputPath

  /**
   * @param { string } basePath
   * @param { string } outputPath
   */
  constructor( basePath, outputPath ) {
    super( 'MacOS', basePath )
    this.outputPath = outputPath
  }

  /**
   * @returns { Promise<Xcode|null> }
   */
  async checkDependencies() {
    const xcode = await Xcode.getInstance()
    if( xcode === null ) {
      LibCompiler.warn( 'Xcode is not available in the system' )
      return null
    }
    const version = xcode.version
    const isXcode16 = version.startsWith( `${ MacLibCompiler.RECOMMENDED_XCODE_VERSION }.` )
    if( !isXcode16 ) {
      LibCompiler.warn( `
        Installed Xcode: ${ version }
        Recommended: ${ MacLibCompiler.RECOMMENDED_XCODE_VERSION }
        This may cause some unexpected issues related to the native functionalities
        `,
      )
    }
    return xcode
  }

  /**
   * @override
   * @protected
   * @param { string } libName
   * @returns { Promise<string|null> }
   */
  async checkLib( libName ) {
    const xcodeproj = resolve( this.basePath, libName, `${ libName }.xcodeproj` )
    const projectExists = await checkFileExists( xcodeproj )
    return projectExists ? xcodeproj : null
  }

  /**
   * @override
   * @protected
   * @param { string } inputPath
   * @param { string } libName
   * @param { Xcode } xcode
   */
  async compileSingleLib( inputPath, libName, xcode ) {
    const outDir = resolve( this.outputPath, libName )
    await xcode.compile( inputPath, outDir )
  }

}

/**
 * @param { string[] } libList
 */
export async function linkMacLibs( ...libList ) {
  const basePath = genPath( '../libs/macos', import.meta.url )
  const outputPath = genPath( '../bin/', import.meta.url )
  const linker = new MacLibCompiler( basePath, outputPath )
  await linker.compileCollection( ...libList )
}

// Executing Main
const isMain = checkIsMain( import.meta.url )
if( isMain ) {
  const [ _node, _script, ...args ] = process.argv  // eslint-disable-line
  main( ...args )
}
