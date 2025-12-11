import { createContext } from 'react'
import { HSL, RGB } from '@/modules/color_codecs/domain'

export interface SelectedColorContext {
  rgb: RGB
  setRgb( rgb:RGB ): void
  hex: string
  setHex( hex:string ): void
  hsl: HSL
  setHsl( hsl:HSL ): void
}

export const SelectedColorContext = createContext( null as unknown as SelectedColorContext )
