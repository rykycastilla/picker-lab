import { RGB } from '../domain/RGB'
import { RgbCodec } from '../application/RgbCodec'
import { useCallback, useEffect, useRef } from 'react'

type CompareFunction<T> = ( a:T, b:T ) => boolean
type Setter<T> = ( value:T ) => void

/**
 * Creates a setter for specific color spectrums of type `T` using the `RGB` as an internal standard to save information of the state
 */
export function useColorSetter<T>(
  previousColor:T, codec:RgbCodec<T>, compare:CompareFunction<T>, setRgb:Setter<RGB>,
): Setter<T> {

  const previousColorRef = useRef<T>( previousColor )

  // Auto updating ref when value changes
  useEffect( () => {
    previousColorRef.current = previousColor
  }, [ previousColorRef, previousColor ] )

  // Setting new value (only if it is different)
  return useCallback( ( color:T ) => {
    const areEquals: boolean = compare( previousColorRef.current, color )
    if( areEquals ) { return }
    const rgb: RGB = codec.encode( color )
    setRgb( rgb )
  }, [ previousColorRef, compare, codec, setRgb ] )

}
