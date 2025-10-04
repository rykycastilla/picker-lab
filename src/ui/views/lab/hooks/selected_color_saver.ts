import { useCallback, useEffect, useRef } from 'react'
import { useColorSaver } from '@/contexts/palette'
import { useRgb } from '@/contexts/selected_color'

export function useSelectedColorSaver(): () => void {

  const saveColor = useColorSaver()
  const [ color ] = useRgb()
  const colorRef = useRef( color )

  // Detecting selected color changes
  useEffect( () => {
    colorRef.current = color
  }, [ color, colorRef ] )

  // Saving selected color
  return useCallback( () => {
    const { red, green, blue } = colorRef.current
    saveColor( red, green, blue )
  }, [ saveColor, colorRef ] )

}
