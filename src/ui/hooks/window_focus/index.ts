import { FocusChangeEvent } from './application/FocusChangeEvent'
import { FocusService } from './application/FocusService'
import { getFocusService } from './infrastructure/get_focus_service'
import { useCallback, useEffect, useState } from 'react'

const focusService: FocusService = getFocusService()

/**
 * Check if the system has focused on this window
 */
export function useWindowFocus(): boolean {

  const [ hasFocus, setHasFocus ] = useState( focusService.current )

  const handleFocusChange = useCallback( ( event:FocusChangeEvent ) => {
    const { hasFocus } = event
    setHasFocus( hasFocus )
  }, [] )

  // Updating focus value based on the window state
  useEffect( () => {
    focusService.addEventListener( 'focus-change', handleFocusChange )
    return () => { focusService.removeEventListener( 'focus-change', handleFocusChange ) }
  }, [ handleFocusChange ] )

  return hasFocus

}
