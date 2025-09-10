import { FocusChangeEvent } from './FocusChangeEvent'
import { FocusEmitter } from './FocusEmitter'
import { FocusRef } from './FocusRef'

export class FocusService implements FocusEmitter, FocusRef {

  constructor(
    private readonly dispatcher: FocusEmitter,
    private readonly ref: FocusRef,
  ) {}

  public addEventListener( type:'focus-change', handle:( event:FocusChangeEvent ) => void ) {
    this.dispatcher.addEventListener( type, handle )
  }

  public removeEventListener( type:'focus-change', handle:( event:FocusChangeEvent ) => void ) {
    this.dispatcher.removeEventListener( type, handle )
  }

  get current(): boolean {
    return this.ref.current
  }

}
