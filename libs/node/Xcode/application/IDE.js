/**
 * @import { Compiler } from '../domain/Compiler.ts'
 */

/**
 * @abstract
 * @implements { Compiler }
 */
export class IDE {

  /** @readonly */ version

  /**
   * @param { string } version
   */
  constructor( version ) {
    this.version = version
  }

  /**
   * @public
   * @abstract
   * @param { string } input
   * @param { string } output
   * @returns { Promise<void> }
   */
  compile( input, output ) { return new Promise( ( resolve ) => resolve() ) }  // eslint-disable-line

}
