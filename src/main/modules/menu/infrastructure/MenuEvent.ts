import { CHECK_MENU_ENABLED, DISABLE_MENU, ENABLE_MENU } from '@shared/modules/menu/constants'
import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { setupEventDecorators } from 'event-listener-decorators'

/**
 * @module MenuEvent
 *
 * @description
 * Sets up event listeners for handling Menu operations using Electron's `ipcMain`.
 * It utilizes a decorator library to manage event handling.
 * Provides types and functions to handle different methods from the Menu Service and set up event decorators.
 */

type MenuAction = typeof CHECK_MENU_ENABLED | typeof DISABLE_MENU | typeof ENABLE_MENU
type MenuEventHandler<T, U extends object> = ( event:IpcMainInvokeEvent, args:U ) => T

type MainGeneric<T extends object> = [ event:IpcMainInvokeEvent, args:T ]
type MenuEventOverload<T extends string, U extends object, K> = ReturnType<typeof setupEventDecorators<MainGeneric<U>,T,K>>[ 1 ]

export interface MenuItemArgs {
  id: string
}

type CheckEnabledItemMenuEvent = MenuEventOverload<typeof CHECK_MENU_ENABLED,MenuItemArgs,Promise<boolean>>
type EnableItemMenuEvent = MenuEventOverload<typeof ENABLE_MENU,MenuItemArgs,Promise<void>>
type DisableItemMenuEvent = MenuEventOverload<typeof DISABLE_MENU,MenuItemArgs,Promise<void>>

interface MenuEvent {
  ( type:Parameters<CheckEnabledItemMenuEvent>[0] ): ReturnType<CheckEnabledItemMenuEvent>
  ( type:Parameters<EnableItemMenuEvent>[0] ): ReturnType<EnableItemMenuEvent>
  ( type:Parameters<DisableItemMenuEvent>[0] ): ReturnType<DisableItemMenuEvent>
}

/**
 * Used to create an event listener executing this function when the event occurs
 */
function suscriber( type:MenuAction, handler:MenuEventHandler<unknown,object> ) {
  ipcMain.handle( type, ( event:IpcMainInvokeEvent, args:object ) => {
    return handler( event, args )
  } )
}

// MenuListener: decorate class to be an events manager
// MenuEvent: decorate the specific event handler
const [ MenuListener, _MenuEvent ] = setupEventDecorators( suscriber )
const MenuEvent = _MenuEvent as MenuEvent

export { MenuListener, MenuEvent }
