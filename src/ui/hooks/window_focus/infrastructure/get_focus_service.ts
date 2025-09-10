import { DOMFocusRef } from './DOMFocusRef'
import { FocusService } from '../application/FocusService'
import { WindowFocusDispatcher } from './WindowFocusDispatcher'

let instance: FocusService | null = null

export function getFocusService(): FocusService {
  if( instance === null ) {
    const focusEmitter: WindowFocusDispatcher = WindowFocusDispatcher.getInstance()
    const focusRef = new DOMFocusRef()
    instance = new FocusService( focusEmitter, focusRef )
  }
  return instance
}
