import { ColorCrudEvent } from './ColorCrudEvent'

export interface ColorCrudEmitter {

  /**
   * Appends an event listener for crud events
   */
  addEventListener( type:'crud', handle:( event:ColorCrudEvent ) => Promise<void> | void ): void

  /**
   * Removes the event listener in target's event listener list with the same type and callback
   */
  removeEventListener( type:'crud', handle:( event:ColorCrudEvent ) => Promise<void> | void ): void

}
