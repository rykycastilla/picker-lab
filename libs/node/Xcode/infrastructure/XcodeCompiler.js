import { spawn } from 'node:child_process'

/**
 * @import { ChildProcessWithoutNullStreams } from 'node:child_process'
 * @import { Compiler } from '../domain/Compiler.ts'
 */

/**
 * @implements { Compiler }
 */
export class XcodeCompiler {

  /**
   * Program name of the Xcode Compiler
   * @public @readonly
   */
  static XCODE = 'xcodebuild'

  /**
   * @private
   * @param { Buffer } data
   */
  handleOutput( data ) {
    const output = data.toString( 'utf-8' )
    console.log( output )
  }

  /**
   * Sets Compilation lifecycle and output
   * @private
   * @param { ChildProcessWithoutNullStreams } compilation
   */
  setCompilationOutput( compilation ) {
    compilation.stdout.on( 'data', ( data ) => this.handleOutput( data ) )
    compilation.stderr.on( 'data', ( data ) => this.handleOutput( data ) )
  }

  /**
   * @public
   * @param { string } input  Path to the .xcodeproj file
   * @param { string } output
   * @returns { Promise<void> }
   */
  compile( input, output ) {
    const target = XcodeCompiler.getTargetName( input )
    const compilation = spawn( XcodeCompiler.XCODE, [
      '-project', input,
      '-scheme', target,
      '-configuration', 'Release',
      `CONFIGURATION_BUILD_DIR=${ output }`,
      `LD_RUNPATH_SEARCH_PATHS=${ output } @executable_path/Frameworks`,
    ] )
    this.setCompilationOutput( compilation )
    // Resolving compilation
    return new Promise( ( resolve ) => {
      compilation.on( 'close', () => resolve() )
    } )
  }

  /**
   * @private
   * @param { string } filename
   * @returns { string }
   */
  static eraseExtension( filename ) {
    const filenameSegments = filename.split( '.' )
    if( filenameSegments.length <= 1 ) { return filename }
    filenameSegments.splice( filenameSegments.length - 1, 1 )
    return filenameSegments.join( '.' )
  }

  /**
   * @param { string } inputPath
   * @returns { string }
   */
  static getTargetName( inputPath ) {
    const pathSections = inputPath.split( '/' )
    const filename = pathSections[ pathSections.length - 1 ] ?? ''
    return XcodeCompiler.eraseExtension( filename )
  }

}
