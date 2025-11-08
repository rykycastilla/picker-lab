import { Item } from '../domain/Item'
import { ReactElement } from 'react'

interface GridItemProps {
  index: number
  name: string
  thumbnail: ReactElement
}

const GridItem = ( props:GridItemProps ): ReactElement => {
  const { name, thumbnail } = props
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border border-system-border dark:border-system-border-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer flex-col text-center">
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
}

const GridList = ( props:GridListProps ): ReactElement => {
  const { title, content, thumbnail } = props
  return (
    <section className="space-y-2">
      <h2 className="text-[15px] font-semibold text-system-text">{ title }</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { content.map( ( item:Item, index:number ) => {
          const { key = index, name, thumbnail:target } = item
          const thumbnailContent: ReactElement = thumbnail( target )
          return <GridItem key={ key } index={ index } name={ name } thumbnail={ thumbnailContent } />
        } ) }
      </div>
    </section>
  )
}

export default GridList
