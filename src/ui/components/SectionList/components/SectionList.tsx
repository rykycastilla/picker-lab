import ListItem from '../components/ListItem'
import Section from '@/components/Section'
import { Item } from '../domain/Item'
import { ReactElement } from 'react'

interface SectionListProps {
  title: string
  content: Item[]
  thumbnail( target:string ): ReactElement
}

const SectionList = ( props:SectionListProps ): ReactElement | null => {

  const { title, content, thumbnail } = props

  if( content.length === 0 ) {
    return null
  }

  return (
    <Section
      title={ title }
      padding={ false }>
      { content.map( ( item:Item, index:number ) => {
        const { key = index, name, thumbnail:target } = item
        const thumbnailContent: ReactElement = thumbnail( target )
        return <ListItem key={ key } index={ index } name={ name } thumbnail={ thumbnailContent } />
      } ) }
    </Section>
  )

}

export default SectionList
