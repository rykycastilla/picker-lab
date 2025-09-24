import Input from '@/components/Input'
import { ReactElement, useEffect } from 'react'
import { Stream, useNumericInputStream } from '../hooks/numeric_input_stream'
import { useHsl } from '@/contexts/selected_color'

const MAX_CHANEL_LENGTH = 3
const DEGREES_PATTERN = '^(0|[1-9]|[1-9][0-9]|[1-2][0-9]{2}|3[0-5][0-9]|360)$'
const PERCENTAGE_PATTERN = '^(0|[1-9][0-9]?|100)$'

const HslInput = (): ReactElement => {

  const [ hsl, setHsl ] = useHsl()
  const hueStream = useNumericInputStream( 'H', String( hsl.hue ) )
  const saturationStream = useNumericInputStream( 'S', String( hsl.saturation ) )
  const lightnessStream = useNumericInputStream( 'L', String( hsl.lightness ) )

  // Updating rgb fields when another field updates the color
  useEffect( () => {
    const { hue, saturation, lightness } = hsl
    hueStream.setRawValue( String( hue ) )
    saturationStream.setRawValue( String( saturation ) )
    lightnessStream.setRawValue( String( lightness ) )
  }, [ hsl ] )  // eslint-disable-line

  const hue: number = hueStream.value
  const saturation: number = saturationStream.value
  const lightness: number = lightnessStream.value

  // Updating rgb changes in global color
  useEffect( () => {
    if( isNaN( hue ) || isNaN( saturation ) || isNaN( lightness ) ) { return }
    setHsl( { hue, saturation, lightness } )
  }, [ hue, saturation, lightness, setHsl ] )

  return (
    <div>
      <label className="block text-sm font-medium text-system-text dark:text-system-text-dark mb-2">RGB</label>
      <div className="grid grid-cols-3 gap-6">
        { [ hueStream, saturationStream, lightnessStream ].map( ( hslChannel:Stream ) => {
          const { target, rawValue, setRawValue, setValidValue } = hslChannel
          const pattern: string = target === 'H' ? DEGREES_PATTERN : PERCENTAGE_PATTERN
          return (
            <Input
              key={ target }
              name={ target }
              maxLength={ MAX_CHANEL_LENGTH }
              pattern={ pattern }
              onlyKeepValid
              value={ rawValue } onValueChange={ setRawValue }
              onValidValueChange={ setValidValue } />
          )
        } ) }
      </div>
    </div>
  )

}

export default HslInput
