export interface Compiler {

  /**
   * Compiles the given `input` target to the specified `output` directory.
   */
  compile( input:string, output:string ): Promise<void>

}
