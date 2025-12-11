import { RGB } from '@/modules/color_codecs/domain'
import { RgbCodec } from '@/modules/color_codecs/application'
import { useMemo } from 'react'

/**
 * Translates a `RGB` value into its equivalent in the other spectrum
 */
export function useAlternativeSpectrum<T>( rgb:RGB, codec:RgbCodec<T> ): T {
  return useMemo( () => {
    return codec.decode( rgb )
  }, [ rgb, codec ] )
}
