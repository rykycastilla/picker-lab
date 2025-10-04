import { PaletteController } from '@/modules/palette/infrastructure'
import { useMemo } from 'react'

export function useController(): PaletteController {
  return useMemo( () => {
    return new PaletteController()
  }, [] )
}
