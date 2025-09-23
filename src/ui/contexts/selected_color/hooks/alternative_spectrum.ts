import { RGB } from '../domain/RGB'
import { RgbCodec } from '../application/RgbCodec'
import { useMemo } from 'react'

/**
 * Translates a `RGB` value into its equivalent in the other spectrum
 */
export function useAlternativeSpectrum<T>( rgb:RGB, codec:RgbCodec<T> ): T {
  return useMemo( () => {
    return codec.decode( rgb )
  }, [ rgb, codec ] )
}
