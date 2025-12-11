import { Item } from '../domain/Item'
import { ReactElement, useCallback } from 'react'

interface GridItemProps {
  index: number
  thumbnail: ReactElement
  data: Item
  onClick?( item:Item ): void
}

const GridItem = ( props:GridItemProps ): ReactElement => {

  const { thumbnail, data, onClick:handleClick } = props
  const { name } = data

  const handleAction = useCallback( () => {
    if( handleClick === undefined ) { return }
    handleClick( data )
  }, [ data, handleClick ] )

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border border-system-border dark:border-system-border-dark transition-colors duration-200 flex-col text-center"
      style={ { cursor:( handleClick === undefined ? 'default' : 'pointer' ) } }
      onClick={ handleAction }>
      <div
        className="w-8 h-8 border border-system-border dark:border-system-border-dark shadow-sm"
        style={ { borderRadius: '0.4rem', overflow:'hidden' } }>
        { thumbnail }
      </div>
      <span className="text-sm font-medium text-system-text dark:text-system-text-dark">
        { name }
      </span>
    </div>
  )

}

interface GridListProps {
  title: string
  content: Item[]
  thumbnail( target:string ): ReactElement
  onClick?( item:Item ): void
}

const GridList = ( props:GridListProps ): ReactElement => {
  const { title, content, thumbnail, onClick:handleClick } = props
  return (
    <section className="space-y-2">
      <h2 className="text-[15px] font-semibold text-system-text">{ title }</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { content.map( ( item:Item, index:number ) => {
          const { key = index, thumbnail:target } = item
          const thumbnailContent: ReactElement = thumbnail( target )
          return (
            <GridItem
              key={ key }
              index={ index }
              thumbnail={ thumbnailContent }
              data={ item }
              onClick={ handleClick } />
          )
        } ) }
      </div>
    </section>
  )
}

export default GridList
