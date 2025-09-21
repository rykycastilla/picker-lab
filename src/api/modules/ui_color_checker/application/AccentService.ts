import { AccentEmitter } from './AccentEmitter'
import { AccentEvent } from '@shared/modules/ui_color_checker/application'

export class AccentService implements AccentEmitter {

  #value: string | null | undefined = undefined

  constructor(
    private readonly emitter: AccentEmitter,
  ) { this.setValueUpdater() }

  private setValueUpdater() {
    this.addEventListener( 'accent', ( event:AccentEvent ) => {
      this.setValue( event.value )
    } )
  }

  public addEventListener( type:'accent', handle:( event:AccentEvent ) => Promise<void>|void ) {
    this.emitter.addEventListener( type, handle )
  }

  public removeEventListener( type:'accent', handle:( event:AccentEvent ) => Promise<void>|void ) {
    this.emitter.addEventListener( type, handle )
  }

  /**
   * Current accent value.
   * color code (`string`), invalid or multicolor (`null`) or not provided yet (`undefined`)
   */
  get value(): string | null | undefined {
    return this.#value
  }

  private setValue( value:string|null ) {
    this.#value = value
  }

}
