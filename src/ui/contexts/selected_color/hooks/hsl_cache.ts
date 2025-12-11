import { compareRgb } from '../infrastructure/compare_rgb'
import { HSL, RGB } from '@/modules/color_codecs/domain'
import { RgbCodec } from '@/modules/color_codecs/application'
import { useCallback, useMemo } from 'react'
import { useStorageState } from '@/hooks/storage_state'

type HslSetter = ( hsl:HSL ) => void

/**
 * Hook to manage and cache an HSL value based on a given RGB,
 * syncing with a persistent state.
 * It should be use to keep showing wrong hsl values if the rgb result is the same
 * @example hsl( 4 0 0 ) == hsl( 0 0 0 ) // first would be auto translated to second without it
 * @returns Tuple with `getter`, `setter` and a loading promise
 */
export function useHslCache( rgb:RGB, internalHsl:HSL, setInternalHsl:HslSetter, codec:RgbCodec<HSL> ): [ HSL, ( hsl:HSL ) => void, Promise<void> ] {

  const [ hslInput, setHslInput, loadingHslInput ] = useStorageState<HSL|null>( null, 'hsl-input' )

  const setHsl = useCallback( ( hsl:HSL ) => {
    setHslInput( hsl )
    setInternalHsl( hsl )
  }, [ setInternalHsl, setHslInput ] )

  const hsl = useMemo<HSL>( () => {
    if( hslInput === null ) { return internalHsl }
    const cachedHslRgb: RGB = codec.encode( hslInput )
    return compareRgb( rgb, cachedHslRgb ) ? hslInput : internalHsl
  }, [ rgb, codec, internalHsl, hslInput ] )

  return [ hsl, setHsl, loadingHslInput ]

}
