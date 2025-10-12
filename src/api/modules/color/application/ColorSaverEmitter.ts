import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { PublicOf } from '@shared/types/PublicOf'
import { ShouldSaveColorListener } from './ShouldSaveColorListener'

export type ColorSaverEmitter = EventDispatcher<PublicOf<ShouldSaveColorListener>>
