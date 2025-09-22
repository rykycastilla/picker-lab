import { ChangeEvent, ReactElement, useCallback, useLayoutEffect, useMemo } from 'react'

interface SingleColorInputProps {
  name: string
  value: string
  maxLength?: number
  pattern?: string
  onValueChange( value:string ): void
  onIsValidChange?( isValid:boolean ): void
}

const Input = ( props:SingleColorInputProps ): ReactElement => {

  const { name, value, maxLength = Infinity, pattern, onValueChange:setValue, onIsValidChange:setIsValid } = props

  const isValid = useMemo<boolean>( () => {
    if( pattern === undefined ) { return true }
    return RegExp( pattern ).test( value )
  }, [ pattern, value ] )

  useLayoutEffect( () => {
    if( setIsValid === undefined ) { return }
    setIsValid( isValid )
  }, [ isValid, setIsValid ] )

  const handleChange = useCallback( ( event:ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target
    if( value.length <= maxLength ) { setValue( value ) }
  }, [ maxLength, setValue ] )

  return (
    <div>
      <label className="block text-xs text-system-text-secondary mb-1">{ name }</label>
      <input
        className={ `system-input w-full ${ isValid ? '' : '!border-system-red !focus:border-system-red !focus:ring-system-red' }` }
        type="text"
        value={ value }
        onChange={ handleChange } />
    </div>
  )

}

export default Input
