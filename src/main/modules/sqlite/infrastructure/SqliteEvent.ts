import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { setupEventDecorators } from 'event-listener-decorators'

/**
 * @module SqliteEvent
 *
 * @description
 * Sets up event listeners for handling SQLite operations using Electron's `ipcMain`.
 * It utilizes a decorator library to manage event handling for SQL operations.
 * Provides types and functions to handle different SQLite requests and set up event decorators.
 */

type RequestType = 'exec' | 'run' | 'all' | 'get'
type SqliteHandler<T, U extends object> = ( event:IpcMainInvokeEvent, args:U ) => T

type MainGeneric<T extends object> = [ event:IpcMainInvokeEvent, args:T ]
type SqliteEventOverload<T extends string, U extends object, K> = ReturnType<typeof setupEventDecorators<MainGeneric<U>,T,K>>[ 1 ]

export interface SqliteExecArgs {
  query: string
}

export interface SqliteParamArgs extends SqliteExecArgs {
  params?: object
}

type SqliteExecEvent = SqliteEventOverload<'exec',SqliteExecArgs,Promise<void>>
type SqliteAllEvent = SqliteEventOverload<'all',SqliteParamArgs,Promise<object[]>>
type SqliteRunEvent = SqliteEventOverload<'run',SqliteParamArgs,Promise<void>>
type SqliteGetEvent = SqliteEventOverload<'get',SqliteParamArgs,Promise<object|undefined>>

interface SqliteEvent {
  ( type:Parameters<SqliteExecEvent>[0] ): ReturnType<SqliteExecEvent>
  ( type:Parameters<SqliteAllEvent>[0] ): ReturnType<SqliteAllEvent>
  ( type:Parameters<SqliteRunEvent>[0] ): ReturnType<SqliteRunEvent>
  ( type:Parameters<SqliteGetEvent>[0] ): ReturnType<SqliteGetEvent>
}

/**
 * Used to create an event listener executing this function when the event occurs
 */
function suscriber( type:RequestType, handler:SqliteHandler<unknown,object> ) {
  ipcMain.handle( `sqlite-${ type }`, ( event:IpcMainInvokeEvent, args:object ) => {
    return handler( event, args )
  } )
}

// SqliteListener: decorate class to be an events manager
// SqliteEvent: decorate the specific event handler
const [ SqliteListener, _SqliteEvent ] = setupEventDecorators( suscriber )
const SqliteEvent = _SqliteEvent as SqliteEvent

export { SqliteListener, SqliteEvent }
