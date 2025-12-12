import { CSSProperties, ReactElement } from 'react'
import { Shape } from '../domain/Shape'
import './DecorationItem.css'

interface DecorationItemProps {
  shape: Shape
  color: CSSProperties[ 'color' ]
}

const DecorationItem = ( props:DecorationItemProps ): ReactElement => {
  const { shape, color } = props
  return (
    <div
      className="toast-decoration"
      style={ {
        backgroundColor: color,
        borderRadius: shape === Shape.CIRCLE ? '50%' : 4,
      } } />
  )
}

export default DecorationItem
