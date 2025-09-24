import { HSL } from '../domain/HSL'
import { SelectedColorContext } from '../context'
import { useContext } from 'react'

/**
 * Gets the `HSL` getter & setter of the current color
 */
export function useHsl(): [ HSL, ( hsl:HSL ) => void ] {
  const { hsl, setHsl } = useContext( SelectedColorContext )
  return [ hsl, setHsl ]
}
