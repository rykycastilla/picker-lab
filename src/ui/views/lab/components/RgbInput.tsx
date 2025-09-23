import Input from '@/components/Input'
import { ReactElement, useEffect } from 'react'
import { Stream, useNumericInputStream } from '../hooks/numeric_input_stream'
import { useRgb } from '@/contexts/selected_color'

const MAX_RGB_CHANEL_LENGTH = 3
const RGB_CHANEL_PATTERN = '^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$'

const RgbInput = (): ReactElement => {

  const [ rgb, setRgb ] = useRgb()
  const redStream = useNumericInputStream( 'R', String( rgb.red ) )
  const greenStream = useNumericInputStream( 'G', String( rgb.green ) )
  const blueStream = useNumericInputStream( 'B', String( rgb.blue ) )

  // Updating rgb fields when another field updates the color
  useEffect( () => {
    const { red, green, blue } = rgb
    redStream.setRawValue( String( red ) )
    greenStream.setRawValue( String( green ) )
    blueStream.setRawValue( String( blue ) )
  }, [ rgb ] )  // eslint-disable-line

  const red: number = redStream.value
  const green: number = greenStream.value
  const blue: number = blueStream.value

  // Updating rgb changes in global color
  useEffect( () => {
    if( isNaN( red ) || isNaN( green ) || isNaN( blue ) ) { return }
    setRgb( { red, green, blue } )
  }, [ red, green, blue, setRgb ] )

  return (
    <div>
      <label className="block text-sm font-medium text-system-text dark:text-system-text-dark mb-2">RGB</label>
      <div className="grid grid-cols-3 gap-6">
        { [ redStream, greenStream, blueStream ].map( ( rgbChanel:Stream ) => {
          const { target, rawValue, setRawValue, setValidValue } = rgbChanel
          return (
            <Input
              key={ target }
              name={ target }
              maxLength={ MAX_RGB_CHANEL_LENGTH }
              pattern={ RGB_CHANEL_PATTERN }
              onlyKeepValid
              value={ rawValue } onValueChange={ setRawValue }
              onValidValueChange={ setValidValue } />
          )
        } ) }
      </div>
    </div>
  )

}

export default RgbInput
