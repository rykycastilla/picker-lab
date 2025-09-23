import { useMemo, useState } from 'react'

export interface Stream {
  target: string
  value: number
  rawValue: string
  setRawValue( rawValue:string ): void
  setValidValue( validValue:string ): void
}

/**
 * Centralizes the state of an specific input field to be converted in a `number` when the `isValid` state is `true`
 * WARNING: `isValid` state by default is `false`
 * @param target  Used to identify a specific input
 * @param defaultValue  Default value to be used for the first time the input field is used
 */
export function useNumericInputStream( target:string, defaultValue:string ): Stream {

  const [ rawValue, setRawValue ] = useState( defaultValue )
  const [ validValue, setValidValue ] = useState<string|null>( null )

  // Creating numeric value if it is valid
  const value = useMemo<number>( () => {
    return validValue === null ? NaN : Number( validValue )
  }, [ validValue ] )

  return useMemo<Stream>( () => {
    return { target, value, rawValue, setRawValue, setValidValue }
  }, [ target, value, rawValue, setRawValue, setValidValue ] )

}
