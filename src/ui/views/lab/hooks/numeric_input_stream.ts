import { useLayoutEffect, useMemo, useState } from 'react'

export interface Stream {
  target: string
  value: number
  rawValue: string
  setRawValue( rawValue:string ): void
  setIsValid( isValid:boolean ): void
}

/**
 * Centralizes the state of an specific input field to be converted in a `number` when the `isValid` state is `true`
 * WARNING: `isValid` state by default is `false`
 * @param target  Used to identify a specific input
 * @param defaultValue  Default value to be used for the first time the input field is used
 */
export function useNumericInputStream( target:string, defaultValue:string ): Stream {

  const [ value, setValue ] = useState( NaN )
  const [ rawValue, setRawValue ] = useState( defaultValue )
  const [ isValid, setIsValid ] = useState( false )

  // Creating numeric value if it is valid
  useLayoutEffect( () => {
    if( !isValid ) { return }
    setValue( Number( rawValue ) )
  }, [ rawValue, isValid ] )

  return useMemo<Stream>( () => {
    return { target, value, rawValue, setRawValue, setIsValid }
  }, [ target, value, rawValue, setRawValue, setIsValid ] )

}
