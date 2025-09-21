import { AccentEvent } from '@shared/modules/ui_color_checker/application'

export interface AccentEmitter {
  addEventListener( type:'accent', handle:( event:AccentEvent ) => Promise<void>|void ): void
  removeEventListener( type:'accent', handle:( event:AccentEvent ) => Promise<void>|void ): void
}
