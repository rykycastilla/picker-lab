import { FullScreenEvent } from './FullScreenEvent'

export interface FullScreenEmitter {
  addEventListener( type:'full-screen', handle:( event:FullScreenEvent ) => void ): void
  removeEventListener( type:'full-screen', handle:( event:FullScreenEvent ) => void ): void
}
