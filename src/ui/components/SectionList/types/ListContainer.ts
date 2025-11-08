import { Item } from '../domain/Item'
import { ReactElement } from 'react'

interface ListContainerProps {
  title: string
  content: Item[]
  thumbnail( target:string ): ReactElement
}

export interface ListContainer {
  ( props:ListContainerProps ): ReactElement
}
