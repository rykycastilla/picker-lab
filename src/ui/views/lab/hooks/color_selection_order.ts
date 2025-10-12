import { useEffect } from 'react'
import { useSelectedColorSaver } from './selected_color_saver'

/**
 * Detect when the main process notifies that the color must be saved and does it
 */
export function useColorSelectionOrder() {
  const saveSelectedColor = useSelectedColorSaver()
  useEffect( () => {
    api.addEventListener( 'should-save-color', saveSelectedColor )
    return () => api.removeEventListener( 'should-save-color', saveSelectedColor )
  }, [ saveSelectedColor ] )
}
