import { BIN_PATH } from '@/constants'
import { ChildProcess, spawn } from '@/utils/infrastructure/spawn'
import { ColorEvent } from './ColorEvent'
import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { resolve } from 'node:path'

export class UiColorCheckerEventEmitter extends EventDispatcher<ColorListener> {

  private static readonly LIB_PATH: string = resolve( BIN_PATH, 'UiColorChecker/UiColorChecker' )

  /** Dispatched if the binary has errors when it is loaded. Behavior expected in another platforms than MacOS */
  public onloaderror: ( () => void ) | null = null

  constructor() {
    super()
    this.setAccentChecker()
  }

  private async setAccentChecker() {
    const uiColorCheckerProcess: ChildProcess | null = await spawn(
      UiColorCheckerEventEmitter.LIB_PATH,
    )
    if( uiColorCheckerProcess === null ) {
      this.dispatchLoadError()  // Notifying that the native library was not found (no MacOS env)
      return
    }
    uiColorCheckerProcess.stdout.on( 'data', ( data:Buffer ) => this.handleData( data ) )
  }

  private dispatchLoadError() {
    if( this.onloaderror === null ) { return }
    this.onloaderror()
  }

  private handleData( data:Buffer ) {
    const message: string = data.toString()
    const { status, value, timeStamp } =  JSON.parse( message ) as ColorEvent
    // Dispatching accent event
    this.dispatch( 'accent', { status, value, timeStamp } )
  }

}

interface ColorListener {
  type: 'accent'
  handle( event:ColorEvent ): Promise<void> | void
}
