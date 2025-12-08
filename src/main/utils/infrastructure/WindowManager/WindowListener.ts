import { WindowEvent } from './WindowEvent'

interface CreateWindowListener {
  type: 'load'
  handle( event:WindowEvent ): Promise<void> | void
}

interface WindowChangeListener {
  type: 'window-change'
  handle( event:WindowEvent<null> ): Promise<void> | void
}

export type WindowListener = CreateWindowListener | WindowChangeListener
