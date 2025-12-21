import { ContextMenuService } from '@/modules/menu/application'
import { ContextMenuServiceFactory } from '@/modules/menu/infrastructure'
import { MenuSchema } from '@shared/modules/menu/domain'
import { useCallback, useEffect, useState } from 'react'

interface ContextMenuTarget {

  /** Pass it to the `ref` *prop* of the target element */
  setRef( element:HTMLElement|null ): void

  /** Indicates the context menu of this element is open */
  isOpen: boolean

}

/**
 * Gives the target element the ability to use a context `menu`
 * @template T  `MenuDependencies` an object used by the menu items as a dependency context to share information and perform out of context actions
 * @param menu  The structure of the invoked context menu. If it is not provided (`null`) the menu context of the system will be used. To avoid menu showing use `[]`
 */
export function useContextMenu<T extends object>( menu:MenuSchema<T>|null ): ContextMenuTarget {

  const [ element, setElement ] = useState<HTMLElement|null>( null )
  const [ isOpen, setIsOpen ] = useState( false )

  const handleContextMenu = useCallback( async( event:MouseEvent ) => {
    if( menu === null ) { return }
    event.preventDefault()
    const contextMenuService: ContextMenuService = ContextMenuServiceFactory.getInstance()
    setIsOpen( true )
    await contextMenuService.invoke( menu )  // Waits until the menu is closed
    setIsOpen( false )  // Disables the menu indicator once it is closed
  }, [ menu ] )

  useEffect( () => {
    if( element === null ) { return }
    element.addEventListener( 'contextmenu', handleContextMenu )
    return () => element.removeEventListener( 'contextmenu', handleContextMenu )
  }, [ element, handleContextMenu ] )

  return { setRef:setElement, isOpen }

}
