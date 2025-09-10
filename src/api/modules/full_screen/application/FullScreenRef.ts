import { FullScreenEmitter } from './FullScreenEmitter'

/**
 * Uses an event emitter to update its reference of the fullscreen state
 i*/
export class FullScreenRef {

  #isActive: boolean = false

  constructor( emitter:FullScreenEmitter ) {
    emitter.addEventListener( 'full-screen', ( event ) => {
      const { isActive } = event
      this.isActive = isActive
    } )
  }

  get isActive(): boolean {
    return this.#isActive
  }

  private set isActive( isActive:boolean ) {
    this.#isActive = isActive
  }

}
