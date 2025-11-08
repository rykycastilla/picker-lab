import { createContext } from 'react'

export interface ViewContext {
  sectionMode: 'list' | 'grid'
  setSectionMode( sectionMode:( 'list' | 'grid' ) ): void
}

export const ViewContext = createContext( null as unknown as ViewContext )
