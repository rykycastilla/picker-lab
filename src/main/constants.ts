import { app } from 'electron'
import { resolve } from 'node:path'

/** `true` if it is in development env */
export const DEVELOPMENT: boolean = process.env.NODE_ENV === 'development'

/** Development server url for UI */
export const DEV_UI_SERVER = 'http://localhost:5180'

/** Application path (folder path) */
export const APP_PATH: string = app.getAppPath()

/** Production UI path (index.html) */
export const PROD_UI_PATH: string = resolve( APP_PATH, '.vite/build/ui/index.html' )
