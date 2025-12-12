import { Color } from '@/modules/palette/domain'
import { copy } from '@/utils/infrastructure/copy'
import { Item } from '@/components/SectionList'
import { RGB } from '@/modules/color_codecs/domain'
import { RgbHexCodec } from '@/modules/color_codecs/infrastructure'
import { useCallback, useMemo } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

type ColorCopyCallback = ( name:string, code:string ) => void
type ColorCopyFunction = ( item:Item ) => void

/**
 * Exposes a `ColorCopyFunction` to notify when a color item is selected to copy it to the clipboard
 * @param colorList  Valid colors to be identified (associated with the selected item)
 * @param callback  Notifies when the color is copied
 */
export function useColorCopy( colorList:Color[], callback?:ColorCopyCallback ): ColorCopyFunction {

  // Creating default (empty callback) to notify color copy
  const handleCallback = useStaticCallback( callback ?? ( () => {} ) )

  // Indexing colors of the list to identify it based on its keys (id's)
  const colorIndex = useMemo<Record<string,RGB>>( () => {
    const index: Record<string,RGB> = {}
    for( const color of colorList ) {
      const { id, red, green, blue } = color
      index[ id ] = { red, green, blue }
    }
    return index
  }, [ colorList ] )

  // Creating codec to use hex values
  const hexCodec = useMemo<RgbHexCodec>( () => {
    return new RgbHexCodec()
  }, [] )

  // Identifying and copying colors
  return useCallback( async( item:Item ) => {
    const { key, name } = item
    if( typeof key !== 'string' ) { return }
    const color: RGB | undefined = colorIndex[ key ]
    if( color === undefined ) { return }
    const hexColor: string = `#${ hexCodec.decode( color ) }`
    await copy( hexColor )
    handleCallback( name, hexColor )
  }, [ colorIndex, hexCodec, handleCallback ] )

}
