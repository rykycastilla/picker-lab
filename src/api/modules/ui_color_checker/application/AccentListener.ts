import { AccentEvent } from '@shared/modules/ui_color_checker/application'

export interface AccentListener {
  type: 'accent'
  handle( event:AccentEvent ): Promise<void> | void
}
