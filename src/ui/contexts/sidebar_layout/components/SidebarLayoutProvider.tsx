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

  // Notifying when the width is loaded
  useEffect( () => {
    if( isWidthLoaded ) { handleLoadStatic() }
  }, [ isWidthLoaded, handleLoadStatic ] )

  return (
    <SidebarLayoutContext.Provider value={ { width, setWidth } }>
      { children }
    </SidebarLayoutContext.Provider>
  )

}

export default SidebarLayoutProvider
