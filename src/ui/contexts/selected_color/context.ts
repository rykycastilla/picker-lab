import { createContext } from 'react'
import { RGB } from './domain/RGB'

export interface SelectedColorContext {
  rgb: RGB
  setRgb( rgb:RGB ): void
}

export const SelectedColorContext = createContext( null as unknown as SelectedColorContext )
