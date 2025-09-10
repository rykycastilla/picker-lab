import { FocusChangeEvent } from './FocusChangeEvent'

export interface FocusEmitter {
  addEventListener( type:'focus-change', handler:( event:FocusChangeEvent ) => void ): void
  removeEventListener( type:'focus-change', handler:( event:FocusChangeEvent ) => void ): void
}
