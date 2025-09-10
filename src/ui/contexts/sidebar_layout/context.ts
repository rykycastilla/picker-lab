import { createContext } from 'react'

export interface SidebarLayoutContext {
  width: number
  setWidth( width:number ): void
  isOpen: boolean
  setIsOpen( isOpen:boolean ): void
}

export const SidebarLayoutContext = createContext( null as unknown as SidebarLayoutContext )
