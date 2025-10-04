import SectionList, { Item } from '@/components/SectionList'
import { Color } from '@/modules/palette/domain'
import { ReactElement, useMemo } from 'react'
import { useMainPalette } from '@/contexts/palette'

const MainWorkingPaletteSection = (): ReactElement => {

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

export default MainWorkingPaletteSection
