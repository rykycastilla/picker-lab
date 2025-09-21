import { getXcodeVersion } from './get_xcode_version.js'
import { IDE } from '../application/IDE.js'
import { XcodeCompiler } from './XcodeCompiler.js'

/**
 * @import { Compiler } from '../domain/Compiler.ts'
 */

/**
 * @implements { Compiler }
 */
export class Xcode extends IDE {

  /** @private @type { Xcode | null | undefined } */ static instance

  /** @private @readonly */ compiler

  /**
   * @private
   * @param { string } version
   */
  constructor( version ) {
    super( version )
    this.compiler = new XcodeCompiler()
  }

  /**
   * @override
   * @public
   * @param { string } input  Path to the .xcodeproj file
   * @param { string } output
   */
  async compile( input, output ) {
    await this.compiler.compile( input, output )
  }

  /**
   * Create an instance only if xcode is in the system
   * @returns { Promise<Xcode|null> }
   */
  static async createInstance() {
    const version = await getXcodeVersion()
    if( version === null ) { return null }
    return new Xcode( version )
  }

  /**
   * @public
   * @returns { Promise<Xcode|null> }
   */
  static async getInstance() {
    if( Xcode.instance === undefined ) {
      Xcode.instance = await Xcode.createInstance()
    }
    return Xcode.instance
  }

}
