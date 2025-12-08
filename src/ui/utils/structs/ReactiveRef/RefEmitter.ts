import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { PublicOf } from '@shared/types/PublicOf'
import { UpdateListener } from './UpdateListener'

/** Interface for the generic Event Dispatcher of the Ref */
type RefDispatcher<T> = EventDispatcher<UpdateListener<T>>

/** Event Emitter Component of the Ref */
export type RefEmitter<T> = PublicOf<RefDispatcher<T>>
