import Section from '@/components/Section'
import { Item } from '../domain/Item'
import { ReactElement, useCallback } from 'react'

interface ListItemProps {
  index: number
  thumbnail: ReactElement
  data: Item
  onClick?( item:Item ): void
}

const ListItem = ( props:ListItemProps ): ReactElement => {

  const { index, thumbnail, data, onClick:handleClick } = props
  const { name } = data

  const handleAction = useCallback( () => {
    if( handleClick === undefined ) { return }
    handleClick( data )
  }, [ data, handleClick ] )

  return (
    <div>
      { index > 0 && (
        <div className="h-px mx-5 bg-[rgb(207,207,207)] dark:bg-[rgb(73,73,73)]" />
      ) }
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={ { cursor:( handleClick === undefined ? 'default' : 'pointer' ) } }
        onClick={ handleAction }>
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
  onClick?( item:Item ): void
}

const List = ( props:ListProps ): ReactElement => {
  const { title, content, thumbnail, onClick:handleClick } = props
  return (
    <Section
      title={ title }
      padding={ false }>
      { content.map( ( item:Item, index:number ) => {
        const { key = index, thumbnail:target } = item
        const thumbnailContent: ReactElement = thumbnail( target )
        return (
          <ListItem
            key={ key }
            index={ index }
            thumbnail={ thumbnailContent }
            data={ item }
            onClick={ handleClick } />
        )
      } ) }
    </Section>
  )
}

export default List
