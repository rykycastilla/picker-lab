export class AvailabilityIndex<T> {

  private readonly index = new Map<T,boolean>()

  /**
   * Sets the `target` as visited (available)
   * @param target
   */
  public check( target:T ) {
    this.index.set( target, true )
  }

  /**
   * Checks if the `target` exists
   * @param target
   * @returns `boolean` indicating `target` existence
   */
  public exists( target:T ): boolean {
    const targetExists: boolean | undefined = this.index.get( target )
    if( targetExists === undefined ) { return false }
    return targetExists
  }

  /**
   * Indicates `target` is not visited (available) already
   * @param target
   */
  public free( target:T ) {
    this.index.delete( target )
  }

}
