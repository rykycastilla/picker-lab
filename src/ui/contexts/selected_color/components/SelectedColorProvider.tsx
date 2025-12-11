import { compareHex } from '../infrastructure/compare_hex'
import { compareHsl } from '../infrastructure/compare_hsl'
import { compareRgb } from '../infrastructure/compare_rgb'
import { NULL_RGB } from '@/modules/color_codecs/constants'
import { ReactElement, ReactNode, useEffect } from 'react'
import { RGB } from '@/modules/color_codecs/domain'
import { RgbCodec, RgbHexCodec, RgbHslCodec } from '@/modules/color_codecs/infrastructure'
import { SelectedColorContext } from '../context'
import { useAlternativeSpectrum } from '../hooks/alternative_spectrum'
import { useColorSetter } from '../hooks/color_setter'
import { useHslCache } from '../hooks/hsl_cache'
import { useRgbCodec } from '../hooks/rgb_codec'
import { useStaticCallback } from '@/hooks/static_callback'
import { useStorageState } from '@/hooks/storage_state'

interface SelectedColorProviderProps {
  children: ReactNode
  onLoad?(): void
}

const SelectedColorProvider = ( props:SelectedColorProviderProps ): ReactElement => {

  const { children, onLoad:handleLoad = () => {} } = props
  const handleLoadStatic = useStaticCallback( handleLoad )

  // Setting RGB (standard value to be stored)
  const [ rgb, setRgb, loadingRgb ] = useStorageState<RGB>( NULL_RGB, 'selected-color' )
  const rgbCodec = useRgbCodec( RgbCodec )
  const setRgbValue = useColorSetter( rgb, rgbCodec, compareRgb, setRgb )

  // Setting hex value
  const rgbHexCodec = useRgbCodec( RgbHexCodec )
  const hex = useAlternativeSpectrum( rgb, rgbHexCodec )
  const setHex = useColorSetter( hex, rgbHexCodec, compareHex, setRgb )

  // Setting hsl to keep wrong hsl values, ex: hsl( 4 0 0 )
  const rgbHslCodec = useRgbCodec( RgbHslCodec )
  const internalHsl = useAlternativeSpectrum( rgb, rgbHslCodec )
  const setInternalHsl = useColorSetter( internalHsl, rgbHslCodec, compareHsl, setRgb )
  // Caching true hsl input
  const [ hsl, setHsl, loadingHslInput ] = useHslCache( rgb, internalHsl, setInternalHsl, rgbHslCodec )

  // Notifying loading event
  useEffect( () => {
    const handleLoad = async() => {
      await loadingRgb
      await loadingHslInput
      handleLoadStatic()
    }
    handleLoad()
  }, [ loadingRgb, loadingHslInput, handleLoadStatic ] )

  return (
    <SelectedColorContext.Provider value={ {
      rgb, setRgb:setRgbValue, hex, setHex, hsl, setHsl,
    } }>
      { children }
    </SelectedColorContext.Provider>
  )

}

export default SelectedColorProvider
