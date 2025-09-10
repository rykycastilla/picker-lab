import { app } from 'electron'
import { resolve } from 'node:path'
import { TITLE_BAR_HEIGHT } from '@shared/constants'

/** `true` if it is in development env */
export const DEVELOPMENT: boolean = process.env.NODE_ENV === 'development'

/** Development server url for UI */
export const DEV_UI_SERVER = 'http://localhost:5180'

/** Application path (folder path) */
export const APP_PATH: string = app.getAppPath()

/** Production UI path (index.html) */
export const PROD_UI_PATH: string = resolve( APP_PATH, '.vite/build/ui/index.html' )

/** Single MacOS traffic light button size */
export const TRAFFIC_LIGHT_SIZE = 16

/** Minimu width of the main window */
export const MIN_WINDOW_WIDTH = 400

/** Minimu height of the main window */
export const MIN_WINDOW_HEIGHT = MIN_WINDOW_WIDTH + TITLE_BAR_HEIGHT
