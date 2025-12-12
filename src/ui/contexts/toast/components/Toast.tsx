import DecorationItem from './DecorationItem'
import { Decoration } from '../infrastructure/Decoration'
import { ReactElement } from 'react'
import './Toast.css'

interface ToastProps {
  messageItems: Array<string|Decoration>
}

const Toast = ( props:ToastProps ): ReactElement => {

  const { messageItems } = props
  const list: ReactElement[] = []

  // Including toast elements
  for( let i = 0; i < messageItems.length; i++ ) {
    const item: string | Decoration = messageItems[ i ]!
    // Using spaces between elements
    if( i > 0 ) { list.push( <span key={ `${ i }-` }>&nbsp;</span> ) }
    // Using decorations or plain text for toast
    let element: ReactElement
    if( item instanceof Decoration ) {
      const { shape, color } = item
      element = <DecorationItem key={ i } shape={ shape } color={ color } />
    }
    else {
      element = <span key={ i }>{ item }</span>
    }
    // Rendering element in the UI
    list.push( element )
  }

  return <div className="context-toast">{ list }</div>

}

export default Toast
