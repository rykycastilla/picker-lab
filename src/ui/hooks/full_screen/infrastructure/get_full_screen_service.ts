import { FullScreenApiDispatcher } from './FullScreenApiDispatcher'
import { FullScreenService } from '../application/FullScreenService'

let instance: FullScreenService | null = null

export function getFullScreenService(): FullScreenService {
  if( instance === null ) {
    const fullScreenEmitter: FullScreenApiDispatcher = FullScreenApiDispatcher.getInstance()
    instance = new FullScreenService( fullScreenEmitter )
  }
  return instance
}
