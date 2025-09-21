import { listDir } from './list_dir.js'
import { styleText } from 'node:util'

/**
 * @abstract
 * @template T  Dependencies
 */
export class LibCompiler {

  /** @readonly */ target
  /** @readonly */ basePath

  /**
   * @param { string } target
   * @param { string } basePath
   */
  constructor( target, basePath ) {
    this.target = target
    this.basePath = basePath
  }

  /**
   * Used to check the dependencies availability
   * @abstract
   * @protected
   * @returns { Promise<T|null> }  Dependencies to be used for the compiler, or `null` if these are not available in the system
   */
  checkDependencies() { return new Promise( ( resolve ) => resolve( null ) ) }

  /**
   * Checks if the provided lib is valid to be compiled
   * @abstract
   * @protected
   * @param { string } libName
   * @returns { Promise<string|null> }  An string representing the path to the compilation input of the lib or `null` if it does not exist
   */
  checkLib( libName ) { return new Promise( ( resolve ) => resolve( null ) ) }  // eslint-disable-line

  /**
   * Compiles only one library using the data provided by the Compiler
   * @abstract
   * @protected
   * @param { string } inputPath
   * @param { string } libName
   * @param { T } dependencies
   * @returns { Promise<void> }
   */
  compileSingleLib( inputPath, libName, dependencies ) { return new Promise( ( resolve ) => resolve() ) }  // eslint-disable-line

  /**
   * @param { string[] } libNameList
   */
  async compileCollection( ...libNameList ) {
  // Using all available directories if a lib list is nor ptovided
  /** @type { string[] } */ const usageLibList = libNameList.length > 0
      ? libNameList
      : await listDir( this.basePath )
    // Validating dependencies
    const dependencies = await this.checkDependencies()
    if( dependencies === null ) {
      LibCompiler.warn( styleText( [ 'red' ], 'Some dependencies are not available!!! Stopping compilation'  ) )
      return
    }
    // Validating & Compiling libraries
    console.log( styleText( [ 'blue' ], 'Compiling native libs for' ), this.target )
    for( const usageLib of usageLibList ) {
      // Preparing lib
      const libPath = await this.checkLib( usageLib )
      if( libPath === null ) {
        LibCompiler.warn( `${ usageLib } is not a valid library to be compiled` )
        continue
      }
      // Compiling
      console.log( 'Compiling', styleText( [ 'green' ], usageLib ),  '...' )
      await this.compileSingleLib( libPath, usageLib, dependencies )
    }
  }

  /**
   * Warnign logs in the console
   * @protected
   * @param { string } message
   */
  static warn( message ) {
    console.log( styleText( [ 'yellow' ], 'WARNING: ' ), message )
  }

}
