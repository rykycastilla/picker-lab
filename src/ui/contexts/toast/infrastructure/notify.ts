import Toast from '../components/Toast'
import { Decoration } from './Decoration'
import { ReactElement } from 'react'
import { toast } from 'react-toastify'

export function notify( ...messageItems:Array<string|Decoration> ) {
  const content: ReactElement = Toast( { messageItems } )
  toast( content )
}
