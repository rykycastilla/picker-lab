import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { UpdateListener } from './UpdateListener'

export class RefDispatcher<T> extends EventDispatcher<UpdateListener<T>> {

  public notifyUpdate( value:T ) {
    this.dispatch( 'update', { value } )
  }

}
