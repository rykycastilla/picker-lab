import { ReactElement, ReactNode, useEffect } from 'react'
import { usePromiseResolved } from '@/hooks/promise_resolved'
import { useStaticCallback } from '@/hooks/static_callback'
import { useStorageState } from '@/hooks/storage_state'
import { ViewContext } from '../context'

interface ViewProviderProps {
  children: ReactNode
  onLoad?(): void
}

const ViewProvider = ( props:ViewProviderProps ): ReactElement => {

  const { children, onLoad:handleLoad = () => {} } = props
  const handleLoadStatic = useStaticCallback( handleLoad )
  const [ sectionMode, setSectionMode, loadingSectionMode ] = useStorageState<'list'|'grid'>( 'list', 'view-mode' )
  const sectionModeLoaded = usePromiseResolved( loadingSectionMode )

  useEffect( () => {
    if( sectionModeLoaded ) { handleLoadStatic() }
  }, [ handleLoadStatic, sectionModeLoaded ] )

  return (
    <ViewContext.Provider value={ { sectionMode, setSectionMode } }>
      { children }
    </ViewContext.Provider>
  )

}

export default ViewProvider
