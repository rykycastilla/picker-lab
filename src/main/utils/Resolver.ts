/**
 * Represents a promise than can be resolved and rejected by itself
 */
export class Resolver<T=void> {

  promise: Promise<T>
  resolve!: ( value:T ) => void

  constructor() {
    this.promise = new Promise<T>( ( resolve ) => {
      this.resolve = resolve
    } )
  }

}
