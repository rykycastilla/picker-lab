import { RgbCodec } from '@/modules/color_codecs/application/RgbCodec'
import { useMemo } from 'react'

interface RgbCodecConstructor<T> {
  new (): RgbCodec<T>
}

/**
 * Instantiates a RgbCodec in the React tree
 */
export function useRgbCodec<T>( RgbCodec:RgbCodecConstructor<T> ): RgbCodec<T> {
  return useMemo( () => {
    return new RgbCodec()
  }, [ RgbCodec ] )
}
