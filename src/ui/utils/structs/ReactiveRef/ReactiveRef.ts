import { Ref } from '@shared/utils/structs/Ref'
import { RefDispatcher } from './RefDispatcher'
import { RefEmitter } from './RefEmitter'
import { RefEvent } from './RefEvent'

export class ReactiveRef<T> extends Ref<T> implements RefEmitter<T> {

  private readonly dispatcher = new RefDispatcher<T>()

  override setValue( value:T ) {
    super.setValue( value )
    this.dispatcher.notifyUpdate( value )
  }

  public addEventListener( type:'update', handler:( event:RefEvent<T> ) => Promise<void> | void ): void {
    this.dispatcher.addEventListener( type, handler )
  }

  public removeEventListener( type:'update', handler:( event:RefEvent<T> ) => Promise<void> | void ): void {
    this.dispatcher.removeEventListener( type, handler )
  }

}
