import SectionList, { Item } from '@/components/SectionList'
import { Color } from '@/modules/palette/domain'
import { ReactElement, useMemo } from 'react'
import { useMainPalette } from '@/contexts/palette'
import { useSectionMode } from '@/contexts/view'

interface ColorPaletteSectionListProps {
  type?: 'list' | 'grid'
}

const ColorPaletteSectionList = ( props:ColorPaletteSectionListProps ): ReactElement => {

  const sectionMode = useSectionMode()
  const { type = sectionMode } = props
  const colorList = useMainPalette()

  const content = useMemo<Item[]>( () => {
    return colorList.map( ( color:Color ) => {
      const { id, name, red, green, blue } = color
      const thumbnail = `rgb( ${ red }, ${ green }, ${ blue } )`
      return { name, thumbnail, key:id }
    } )
  }, [ colorList ] )

  return (
    <SectionList
      title="Color Palette"
      type={ type }
      content={ content }
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
