import Section from '@/components/Section'
import { Item } from '../domain/Item'
import { ReactElement } from 'react'

interface ListItemProps {
  index: number
  name: string
  thumbnail: ReactElement
}

const ListItem = ( props:ListItemProps ): ReactElement => {
  const { index, thumbnail, name } = props
  return (
    <div>
      { index > 0 && (
        <div className="h-px mx-5 bg-[rgb(207,207,207)] dark:bg-[rgb(73,73,73)]" />
      ) }
      <div className="flex items-center gap-3 px-5 py-3 cursor-default">
        <div
          className="w-8 h-8 border border-system-border dark:border-system-border-dark shadow-sm"
          style={ { borderRadius:'0.4rem', overflow:'hidden' } }>
          { thumbnail }
        </div>
        <span className="text-sm font-medium text-system-text dark:text-system-text-dark">
          { name }
        </span>
      </div>
    </div>
  )
}

interface ListProps {
  title: string
  content: Item[]
  thumbnail( target:string ): ReactElement
}

const List = ( props:ListProps ): ReactElement => {
  const { title, content, thumbnail } = props
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

export default List
