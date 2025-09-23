import { SelectedColorContext } from '../context'
import { useContext } from 'react'

/**
 * Gets the `hex` getter & setter of the current color
 */
export function useHex(): [ string, ( hex:string ) => void ] {
  const { hex, setHex } = useContext( SelectedColorContext )
  return [ hex, setHex ]
}
