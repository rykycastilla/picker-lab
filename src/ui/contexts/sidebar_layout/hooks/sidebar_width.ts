import { SidebarLayoutContext } from '../context'
import { useContext } from 'react'

export function useSidebarWidth(): [ number, ( width:number ) => void ] {
  const { width, setWidth } = useContext( SidebarLayoutContext )
  return [ width, setWidth ]
}
