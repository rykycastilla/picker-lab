import { FullScreenEvent } from './application/FullScreenEvent'
import { FullScreenService } from './application/FullScreenService'
import { getFullScreenService } from './infrastructure/get_full_screen_service'
import { useCallback, useEffect, useState } from 'react'

const fullScreenService: FullScreenService = getFullScreenService()

/**
 * Says if the current window is in full screen
 */
export function useFullScreen(): boolean {

  const [ isFullScreen, setIsFullScreen ] = useState( fullScreenService.isActive )

  const handleFullScreen = useCallback( ( event:FullScreenEvent ) => {
    const { isActive } = event
    setIsFullScreen( isActive )
  }, [] )

  // detecting full screen state
  useEffect( () => {
    fullScreenService.addEventListener( 'full-screen', handleFullScreen )
    return () => fullScreenService.removeEventListener( 'full-screen', handleFullScreen )
  }, [ handleFullScreen ] )

  return isFullScreen

}
