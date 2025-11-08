import { ViewContext } from '../context'
import { useCallback, useContext } from 'react'

interface SectionModeHandlersUtils {
  setList(): void
  setGrid(): void
}

/**
 * Expose handlers to set `list` and `grid` mode
 */
export function useSectionModeHandlers(): SectionModeHandlersUtils {

  const { setSectionMode } = useContext( ViewContext )

  const setList = useCallback( () => {
    setSectionMode( 'list' )
  }, [ setSectionMode ] )

  const setGrid = useCallback( () => {
    setSectionMode( 'grid' )
  }, [ setSectionMode ] )

  return { setList, setGrid }

}
