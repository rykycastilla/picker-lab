import { useCallback, useEffect, useMemo } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

/**
 * Detect `keys` pressing and execute `callback`
 * @param `callback`  Action to be done
 * @param `keys`  Keys to be detected from the keyboard
 */
export function useKeyboard( callback:( key:string ) => void, keys:string[] ) {

  const staticCallback = useStaticCallback( callback )

  // Structuring valid keys to be detected
  const keyList = useMemo<Set<string>>( () => {
    return new Set<string>( keys )
  }, [ JSON.stringify( keys ) ] )  // eslint-disable-line

  // filtering pressed key and using callback with valid keys
  const handleKeyPress = useCallback( ( event:KeyboardEvent ) => {
    const { key } = event
    const isValid: boolean = keyList.has( key )
    if( isValid ) { staticCallback( key ) }
  }, [ keyList, staticCallback ] )

  // Detecting key pressing
  useEffect( () => {
    window.addEventListener( 'keydown', handleKeyPress )
    return () => window.removeEventListener( 'keydown', handleKeyPress )
  }, [ handleKeyPress ] )

}
