import GridList from './GridList'
import List from './List'
import { Item } from '../domain/Item'
import { ListContainer } from '../types/ListContainer'
import { ReactElement } from 'react'

interface SectionListProps {
  title: string
  type?: 'list' | 'grid'
  content: Item[]
  thumbnail( target:string ): ReactElement
}

const SectionList = ( props:SectionListProps ): ReactElement | null => {
  const { title, type = 'list', content, thumbnail } = props
  if( content.length === 0 ) { return null }
  const Container: ListContainer = type === 'grid' ? GridList : List
  return <Container title={ title } content={ content } thumbnail={ thumbnail } />
}

export default SectionList
