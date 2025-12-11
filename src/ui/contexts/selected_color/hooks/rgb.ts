import { RGB } from '@/modules/color_codecs/domain'
import { SelectedColorContext } from '../context'
import { useContext } from 'react'

/**
 * Gets the `RGB` getter & setter of the current color
 */
export function useRgb(): [ RGB, ( rgb:RGB ) => void ] {
  const { rgb, setRgb } = useContext( SelectedColorContext )
  return [ rgb, setRgb ]
}
