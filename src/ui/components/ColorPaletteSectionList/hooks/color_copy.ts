import { Color } from '@/modules/palette/domain'
import { copy } from '@/utils/infrastructure/copy'
import { Item } from '@/components/SectionList'
import { RGB } from '@/modules/color_codecs/domain'
import { RgbHexCodec } from '@/modules/color_codecs/infrastructure'
import { useCallback, useMemo } from 'react'

type ColorCopyFunction = ( item:Item ) => void

export function useColorCopy( colorList:Color[] ): ColorCopyFunction {

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
  return useCallback( ( item:Item ) => {
    const { key } = item
    if( typeof key !== 'string' ) { return }
    const color: RGB | undefined = colorIndex[ key ]
    if( color === undefined ) { return }
    const hexColor: string = hexCodec.decode( color )
    copy( `#${ hexColor }` )
  }, [ colorIndex, hexCodec ] )

}
