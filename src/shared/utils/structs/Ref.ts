/**
 * Create dynamic references of any type.
 */
export class Ref<T> {

  #value: T

  constructor( value:T ) {
    this.#value = value
  }

  /**
   * Current value
   */
  get value(): T {
    return this.#value
  }

  /**
   * Updates value
   */
  public setValue( value: T ) {
    this.#value = value
  }

}
