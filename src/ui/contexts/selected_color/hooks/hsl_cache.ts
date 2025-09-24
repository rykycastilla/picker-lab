import { compareRgb } from '../infrastructure/compare_rgb'
import { HSL } from '../domain/HSL'
import { RGB } from '../domain/RGB'
import { RgbCodec } from '../application/RgbCodec'
import { useCallback, useMemo, useState } from 'react'

type HslSetter = ( hsl:HSL ) => void

export function useHslCache( rgb:RGB, internalHsl:HSL, setInternalHsl:HslSetter, codec:RgbCodec<HSL> ): [ HSL, ( hsl:HSL ) => void ] {

  const [ hslInput, setHslInput ] = useState<HSL|null>( null )

  const setHsl = useCallback( ( hsl:HSL ) => {
    setHslInput( hsl )
    setInternalHsl( hsl )
  }, [ setInternalHsl ] )

  const hsl = useMemo<HSL>( () => {
    if( hslInput === null ) { return internalHsl }
    const cachedHslRgb: RGB = codec.encode( hslInput )
    return compareRgb( rgb, cachedHslRgb ) ? hslInput : internalHsl
  }, [ rgb, codec, internalHsl, hslInput ] )

  return [ hsl, setHsl ]

}
