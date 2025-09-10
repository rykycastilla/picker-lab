import { FullScreenEmitter } from './FullScreenEmitter'
import { FullScreenEvent } from './FullScreenEvent'

export class FullScreenService implements FullScreenEmitter {

  #isActive = false

  constructor(
    private readonly emitter: FullScreenEmitter,
  ) { this.setRefEvents() }

  /**
   * Updates `isActive` value in real time based on `full-screen` events
   */
  private setRefEvents() {
    this.addEventListener( 'full-screen', ( event:FullScreenEvent ) => {
      const { isActive } = event
      this.isActive = isActive
    } )
  }

  public addEventListener( type:'full-screen', handle:( event:FullScreenEvent ) => void ) {
    this.emitter.addEventListener( type, handle )
  }

  public removeEventListener( type:'full-screen', handle:( event:FullScreenEvent ) => void ) {
    this.emitter.removeEventListener( type, handle )
  }

  get isActive(): boolean {
    return this.#isActive
  }

  private set isActive( isActive:boolean ) {
    this.#isActive = isActive
  }

}
