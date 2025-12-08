import { ActiveComponentsManager } from './application/ActiveComponentsManager'
import { useEffect } from 'react'

const componentsManager = new ActiveComponentsManager( api.menuService )

/**
 * Ensure color saver menu item is enabled when the usage componente is rendering.
 * It only has effect if the window is focused
 */
export function useColorSaverMenuAction() {
  useEffect( () => {
    componentsManager.add()
    return () => componentsManager.quit()
  }, [] )
}
