import { DEFAULT_SIDEBAR_WIDTH } from '@/constants'
import { ReactElement, ReactNode, useEffect } from 'react'
import { SidebarLayoutContext } from '../context'
import { usePromiseResolved } from '@/hooks/promise_resolved'
import { useStorageState } from '@/hooks/storage_state'
import { useStaticCallback } from '@/hooks/static_callback'

interface SidebarLayoutProviderProps {
  children: ReactNode
  onLoad?(): void
}

const SidebarLayoutProvider = ( props:SidebarLayoutProviderProps ): ReactElement => {

  const { children, onLoad:handleLoad = () => {} } = props
  const handleLoadStatic = useStaticCallback( handleLoad )

  // Loading sidebar width (state) from storage
  const [ width, setWidth, loadingWidth ] = useStorageState( DEFAULT_SIDEBAR_WIDTH, 'sidebar-width' )
  const isWidthLoaded = usePromiseResolved( loadingWidth )

  // Loading sidebar open state (state) from storage
  const [ isOpen, setIsOpen, loadingIsOpen ] = useStorageState( true, 'sidebar-is-open' )
  const isOpenLoaded = usePromiseResolved( loadingIsOpen )

  // Notifying when the width is loaded
  useEffect( () => {
    if( isWidthLoaded && isOpenLoaded ) { handleLoadStatic() }
  }, [ isWidthLoaded, isOpenLoaded, handleLoadStatic ] )

  return (
    <SidebarLayoutContext.Provider value={ { isOpen, setIsOpen, width, setWidth } }>
      { children }
    </SidebarLayoutContext.Provider>
  )

}

export default SidebarLayoutProvider
