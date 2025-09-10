import { FocusRef } from '../application/FocusRef'

export class DOMFocusRef implements FocusRef {

  get current(): boolean {
    return document.hasFocus()
  }

}
