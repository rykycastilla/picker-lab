import { ChangeEvent, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface InputProps {
  name?: string
  value: string
  maxLength?: number
  pattern?: string
  onlyKeepValid?: boolean
  onValueChange( value:string ): void
  onValidValueChange?( validValue:string ): void
}

const Input = ( props:InputProps ): ReactElement => {

  const {
    name, value, maxLength = Infinity, pattern, onlyKeepValid = false,
    onValueChange:setValue, onValidValueChange:handleValidValue,
  } = props

  const [ validValue, setValidValue ] = useState( '' )
  const inputRef = useRef<HTMLInputElement|null>( null )

  const isValid = useMemo<boolean>( () => {
    if( pattern === undefined ) { return true }
    return RegExp( pattern ).test( value )
  }, [ pattern, value ] )

  useEffect( () => {
    if( !onlyKeepValid ) { return }
    const input: HTMLInputElement = inputRef.current!
    const handleBlur = () => setValue( validValue )
    input.addEventListener( 'blur', handleBlur )
    return () => input.removeEventListener( 'blur', handleBlur )
  }, [ onlyKeepValid, inputRef, setValue, validValue ] )

  // Filtering valid value
  useEffect( () => {
    if( !isValid ) { return }
    setValidValue( value )
    if( handleValidValue !== undefined ) { handleValidValue( value ) }
  }, [ isValid, value, handleValidValue ] )

  const handleChange = useCallback( ( event:ChangeEvent<HTMLInputElement> ) => {
    const { value } = event.target
    if( value.length <= maxLength ) { setValue( value ) }
  }, [ maxLength, setValue ] )

  return (
    <div>
      { ( name !== undefined ) && (
        <label className="block text-xs text-system-text-secondary mb-1">{ name }</label>
      ) }
      <input
        ref={ inputRef }
        className={ `system-input w-full ${ isValid ? '' : '!border-system-red !focus:border-system-red !focus:ring-system-red' }` }
        type="text"
        value={ value }
        onChange={ handleChange } />
    </div>
  )

}

export default Input
