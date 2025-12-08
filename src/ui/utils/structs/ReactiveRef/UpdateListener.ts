import { RefEvent } from './RefEvent'

export interface UpdateListener<T> {
  type: 'update'
  handle( event:RefEvent<T> ): Promise<void> | void
}
