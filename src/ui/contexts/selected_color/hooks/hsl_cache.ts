import { compareRgb } from '../infrastructure/compare_rgb'
import { HSL } from '../domain/HSL'
import { RGB } from '../domain/RGB'
import { RgbCodec } from '../application/RgbCodec'
import { useCallback, useMemo } from 'react'
import { useStorageState } from '@/hooks/storage_state'

type HslSetter = ( hsl:HSL ) => void

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
