import { compareHex } from '../infrastructure/compare_hex'
import { compareHsl } from '../infrastructure/compare_hsl'
import { compareRgb } from '../infrastructure/compare_rgb'
import { ReactElement, ReactNode, useState } from 'react'
import { RGB } from '../domain/RGB'
import { RgbCodec } from '../infrastructure/RgbCodec'
import { RgbHexCodec } from '../infrastructure/RgbHexCodec'
import { RgbHslCodec } from '../infrastructure/RgbHslCodec'
import { SelectedColorContext } from '../context'
import { useAlternativeSpectrum } from '../hooks/alternative_spectrum'
import { useColorSetter } from '../hooks/color_setter'
import { useHslCache } from '../hooks/hsl_cache'
import { useRgbCodec } from '../hooks/rgb_codec'

interface SelectedColorProviderProps {
  children: ReactNode
}

const SelectedColorProvider = ( props:SelectedColorProviderProps ): ReactElement => {

  const { children } = props
  const [ rgb, setRgb ] = useState<RGB>( { red:255, green:0, blue:0 } )
  const rgbCodec = useRgbCodec( RgbCodec )
  const rgbHexCodec = useRgbCodec( RgbHexCodec )
  const rgbHslCodec = useRgbCodec( RgbHslCodec )
  const hex = useAlternativeSpectrum( rgb, rgbHexCodec )
  const setHex = useColorSetter( hex, rgbHexCodec, compareHex, setRgb )
  const setRgbValue = useColorSetter( rgb, rgbCodec, compareRgb, setRgb )

  // Setting hsl to keep wrong hsl values, ex: hsl( 4 0 0 )
  const internalHsl = useAlternativeSpectrum( rgb, rgbHslCodec )
  const setInternalHsl = useColorSetter( internalHsl, rgbHslCodec, compareHsl, setRgb )
  // Caching true hsl input
  const [ hsl, setHsl ] = useHslCache( rgb, internalHsl, setInternalHsl, rgbHslCodec )

  return (
    <SelectedColorContext.Provider value={ {
      rgb, setRgb:setRgbValue, hex, setHex, hsl, setHsl,
    } }>
      { children }
    </SelectedColorContext.Provider>
  )

}

export default SelectedColorProvider
