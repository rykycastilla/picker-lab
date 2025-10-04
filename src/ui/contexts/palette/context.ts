import { createContext } from 'react'
import { PaletteController } from '@/modules/palette/infrastructure'

export interface PaletteContext {
  controller: PaletteController
}

export const PaletteContext = createContext( null as unknown as PaletteContext )
