import { AccentEvent } from '@shared/modules/ui_color_checker/application'
import { MAIN_ACCENT_COLOR } from '@/constants'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'

/**
 * Provides a dynamic accent color
 * @returns The accent color based in the system config (by default the app value). It would be `null` if the accent was not provided yet by the system
 */
export function useAccentColor(): string | null {

  const cachedFirstUiAccent = useMemo<string|null|undefined>( () => {
    return api.getUiAccent()
  }, [] )

  const [ systemAccent, setSystemAccent ] = useState<string|null|undefined>( cachedFirstUiAccent )

  const handleAccentUpdate = useCallback( ( event:AccentEvent ) => {
    setSystemAccent( event.value )
  }, [] )

  useLayoutEffect( () => {
    api.addEventListener( 'accent', handleAccentUpdate )
    return () => api.removeEventListener( 'accent', handleAccentUpdate )
  }, [ handleAccentUpdate ] )

  if( systemAccent === undefined ) { return null }
  return systemAccent ?? MAIN_ACCENT_COLOR

}
