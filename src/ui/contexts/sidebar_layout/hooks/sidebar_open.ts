import { SidebarLayoutContext } from '../context'
import { useContext } from 'react'

export function useSidebarOpen(): [ boolean, ( isOpen:boolean ) => void ] {
  const { isOpen, setIsOpen } = useContext( SidebarLayoutContext )
  return [ isOpen, setIsOpen ]
}
