import Input from '@/components/Input'
import { ReactElement } from 'react'
import { Stream, useNumericInputStream } from '../hooks/numeric_input_stream'

const MAX_RGB_CHANEL_LENGTH = 3
const RGB_CHANEL_PATTERN = '^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$'

const RgbInput = (): ReactElement => {

  const redStream = useNumericInputStream( 'R', '255' )
  const greenStream = useNumericInputStream( 'G', '0' )
  const blueStream = useNumericInputStream( 'B', '0' )
  const colorStreamList: Stream[] = [ redStream, greenStream, blueStream ]

  return (
    <div>
      <label className="block text-sm font-medium text-system-text dark:text-system-text-dark mb-2">RGB</label>
      <div className="grid grid-cols-3 gap-6">
        { colorStreamList.map( ( rgbChanel ) => {
          const { target, rawValue, setRawValue, setIsValid } = rgbChanel
          return (
            <Input
              key={ target }
              name={ target }
              maxLength={ MAX_RGB_CHANEL_LENGTH }
              pattern={ RGB_CHANEL_PATTERN }
              value={ rawValue } onValueChange={ setRawValue }
              onIsValidChange={ setIsValid } />
          )
        } ) }
      </div>
    </div>
  )

}

export default RgbInput
