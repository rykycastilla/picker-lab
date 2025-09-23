import { createContext } from 'react'
import { RGB } from './domain/RGB'

export interface SelectedColorContext {
  rgb: RGB
  setRgb( rgb:RGB ): void
  hex: string
  setHex( hex:string ): void
}

export const SelectedColorContext = createContext( null as unknown as SelectedColorContext )
