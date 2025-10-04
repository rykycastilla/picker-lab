import { PaletteContext } from '../context'
import { useCallback, useContext } from 'react'

/**
 * Provides a function to include a `RGB` color in the main working palette
 * @returns Including function
 */
export function useColorSaver(): ( red:number, green:number, blue:number ) => void {
  const { controller } = useContext( PaletteContext )
  return useCallback( ( red:number, green:number, blue:number ) => {
    controller.include( red, green, blue )
  }, [ controller ] )
}
