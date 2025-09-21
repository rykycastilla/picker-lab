import * as Constants from '@/constants'
import ElectronWindowState, { State } from 'electron-window-state'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { FULL_SCREEN_NOTIFICATION, TITLE_BAR_HEIGHT } from '@shared/constants'
import { resolve } from 'node:path'
import { WindowEvent } from './WindowEvent'
import { WindowEventEmitter } from './WindowEventEmitter'

const {
  APP_PATH,
  DEVELOPMENT,
  DEV_UI_SERVER,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  PROD_UI_PATH,
  TRAFFIC_LIGHT_SIZE,
} = Constants

export class WindowLauncher {

  public static readonly TRAFFIC_LIGHTS_POSITION: number = ( TITLE_BAR_HEIGHT - TRAFFIC_LIGHT_SIZE ) / 2

  constructor(
    private readonly emitter: WindowEventEmitter,
  ) {}

  /**
   * Creates a window that keep its position and size between instances.
   * the values `width`, `height`, `x`, `y` and `fullscreen` will be ignored.
   */
  private createStatefullWindow( args:BrowserWindowConstructorOptions ): BrowserWindow {
    const windowState: State = ElectronWindowState( {} )
    const { width, height, x, y, isFullScreen:fullscreen } = windowState
    const win = new BrowserWindow( {
      ...args, width, height, x, y, fullscreen,
    } )
    windowState.manage( win )
    return win
  }

  private async loadContent( win:BrowserWindow ) {
    if( DEVELOPMENT ) { await win.loadURL( DEV_UI_SERVER ) }
    else { await win.loadFile( PROD_UI_PATH ) }
  }

  /**
   * Notifies to the window if it is using full screen mode
   */
  private setFullScreenListeners( win:BrowserWindow ) {
    // Preparing state updates
    win.addListener( 'enter-full-screen', () => {
      win.webContents.send( FULL_SCREEN_NOTIFICATION, true )
    } )
    win.addListener( 'leave-full-screen', () => {
      win.webContents.send( FULL_SCREEN_NOTIFICATION, false )
    } )
    // Notifying the init (saved) state
    this.emitter.addEventListener( 'load', ( event:WindowEvent ) => {
      if( win !== event.window ) { return }
      const isFullScreen: boolean = win.isFullScreen()
      win.webContents.send( FULL_SCREEN_NOTIFICATION, isFullScreen )
    } )
  }

  /**
   * Launches a new window
   */
  public async launch() {
    const win: BrowserWindow = this.createStatefullWindow( {
      titleBarStyle: 'hiddenInset',
      vibrancy: 'under-window',
      fullscreenable: true,
      minWidth: MIN_WINDOW_WIDTH,
      minHeight: MIN_WINDOW_HEIGHT,
      trafficLightPosition: { x:WindowLauncher.TRAFFIC_LIGHTS_POSITION, y:WindowLauncher.TRAFFIC_LIGHTS_POSITION },
      webPreferences: {
        preload: resolve( APP_PATH, '.vite/build/api.cjs' ),
        contextIsolation: true,
      },
    } )
    // Setting window
    this.emitter.setLoadEventFor( win )
    this.setFullScreenListeners( win )
    await this.loadContent( win )
  }

}
