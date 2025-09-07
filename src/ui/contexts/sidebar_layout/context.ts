import { createContext } from 'react'

export interface SidebarLayoutContext {
  width: number
  setWidth( width:number ): void
}

export const SidebarLayoutContext = createContext( null as unknown as SidebarLayoutContext )
