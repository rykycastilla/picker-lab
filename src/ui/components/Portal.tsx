import { createPortal } from 'react-dom'
import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react'

interface PortalProps {
  children: ReactNode
  target: string
}

const Portal = ( props:PortalProps ): ReactElement => {

  const { children, target } = props
  const [ mounted, setMounted ] = useState( false )

  useEffect( () => {
    setMounted( true )
  }, [] )

  const containerElement = useMemo<HTMLElement|null>( () => {
    return document.querySelector( target )
  }, [ target, mounted ] )  // eslint-disable-line

  return (
    <>
      { mounted && createPortal( children, containerElement! ) }
    </>
  )

}

export default Portal
