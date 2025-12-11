import SectionList, { Item } from '@/components/SectionList'
import { Color } from '@/modules/palette/domain'
import { ReactElement, useMemo } from 'react'
import { useColorCopy } from './hooks/color_copy'
import { useMainPalette } from '@/contexts/palette'
import { useSectionMode } from '@/contexts/view'

interface ColorPaletteSectionListProps {
  type?: 'list' | 'grid'
  max?: number
}

const ColorPaletteSectionList = ( props:ColorPaletteSectionListProps ): ReactElement => {

  const sectionMode = useSectionMode()
  const { type = sectionMode, max = Infinity } = props
  const colorList = useMainPalette()

  const content = useMemo<Item[]>( () => {
    const itemList: Item[] = []
    const minLimit: number = colorList.length - max
    const start: number = minLimit < 0 ? 0 : minLimit
    for( let i = start; i < colorList.length; i++ ) {
      const color: Color = colorList[ i ]!
      const { id, name, red, green, blue } = color
      const thumbnail = `rgb( ${ red }, ${ green }, ${ blue } )`
      const item: Item = { name, thumbnail, key:id }
      itemList.push( item )
    }
    return itemList
  }, [ colorList, max ] )

  const handleColorCopy = useColorCopy( colorList )

  return (
    <SectionList
      title="Color Palette"
      type={ type }
      content={ content }
      onClick={ handleColorCopy }
      thumbnail={ ( backgroundColor:string ) => (
        <div
          style={ {
            width: '100%',
            height: '100%',
            backgroundColor,
            display: 'flex',
          } } />
      ) } />
  )

}

export default ColorPaletteSectionList
