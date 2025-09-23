import Input from '@/components/Input'
import { ReactElement, useEffect, useState } from 'react'
import { useHex } from '@/contexts/selected_color'

const MAX_HEX_LENGTH = 6
const HEX_PATTERN = '[0-9A-Fa-f]{6}$'

const HexInput = (): ReactElement => {

  const [ hex, setHex ] = useHex()
  const [ value, setValue ] = useState( hex )
  const [ validValue, setValidValue ] = useState<string|null>( null )

  // Updating hex field when another field updates the color
  useEffect( () => {
    setValue( hex )
  }, [ hex ] )

  // Updating hex changes in global color
  useEffect( () => {
    if( validValue === null ) { return }
    setHex( validValue )
  }, [ validValue, setHex ] )

  return (
    <div>
      <label className="block text-sm font-medium text-system-text dark:text-system-text-dark mb-2">HEX</label>
      <div className="flex items-center gap-4">
        <span className="text-system-text dark:text-system-text-dark font-mono">#</span>
        <Input
          maxLength={ MAX_HEX_LENGTH }
          pattern={ HEX_PATTERN }
          onlyKeepValid
          value={ value }
          onValueChange={ setValue }
          onValidValueChange={ setValidValue } />
      </div>
    </div>
  )

}

export default HexInput
