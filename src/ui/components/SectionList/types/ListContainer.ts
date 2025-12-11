import { Item } from '../domain/Item'
import { ReactElement } from 'react'

interface ListContainerProps {
  title: string
  content: Item[]
  thumbnail( target:string ): ReactElement
  onClick?( item:Item ): void
}

export interface ListContainer {
  ( props:ListContainerProps ): ReactElement
}
