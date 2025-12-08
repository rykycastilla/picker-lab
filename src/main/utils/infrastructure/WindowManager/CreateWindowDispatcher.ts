import { BrowserWindow } from 'electron'
import { WindowEvent } from './WindowEvent'

export class CreateWindowDispatcher {

  constructor(
    private readonly dispatch: DispatcherFunction,
  ) {}

  public setLoadEventFor( window:BrowserWindow ) {
    window.webContents.addListener( 'did-finish-load', () => {
      const event = new WindowEvent( window )
      this.dispatch( event )
    } )
  }

}

interface DispatcherFunction {
  ( event:WindowEvent ): void
}
