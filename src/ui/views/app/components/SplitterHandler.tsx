import { MouseEvent as ReactMouseEvent, ReactElement, RefObject, useEffect, useRef } from 'react'
import { useStaticCallback } from '@/hooks/static_callback'

interface SplitterHandlerProps {
  minPaneWidth: number
  maxPaneWidth: number
  paneRef: RefObject<HTMLElement|null>
  isResizingState: [ boolean, ( value:boolean ) => void ]
  paneWidthState: [ number, ( value:number ) => void ]
}

const SplitterHandler = ( props:SplitterHandlerProps ): ReactElement => {

  const { minPaneWidth, maxPaneWidth, paneRef, isResizingState, paneWidthState } = props
  const [ isResizing, setIsResizing ] = isResizingState
  const [ paneWidth, setPaneWidth ] = paneWidthState
  const lastOpenWidthRef = useRef( paneWidth )

  const handleMouseMove = useStaticCallback( ( event:MouseEvent ) => {
    const containerLeft: number = paneRef.current?.getBoundingClientRect().left ?? 0
    const desired: number = event.clientX - containerLeft
    const clamped: number = Math.min( maxPaneWidth, Math.max( minPaneWidth, desired ) )
    setPaneWidth( clamped )
  } )

  const handleMouseUp = useStaticCallback( () => {
    setIsResizing( false )
    // Record last width on end
    lastOpenWidthRef.current = paneWidth
    window.removeEventListener( 'mousemove', handleMouseMove )
    window.removeEventListener( 'mouseup', handleMouseUp )
  } )

  // Mouse handlers for resizing
  useEffect( () => {
    if ( !isResizing ) { return }
    window.addEventListener( 'mousemove', handleMouseMove )
    window.addEventListener( 'mouseup', handleMouseUp )
    return () => {
      window.removeEventListener( 'mousemove', handleMouseMove )
      window.removeEventListener( 'mouseup', handleMouseUp )
    }
  }, [ handleMouseMove, handleMouseUp, isResizing ] )

  return (
    <div
      className="absolute top-0 left-0 h-full w-2 cursor-col-resize"
      onMouseDown={ ( event:ReactMouseEvent ) => {
        event.preventDefault()
        setIsResizing( true )
      } }>
      <div className="absolute top-0 left-0 h-full w-px dark:bg-black bg-[rgb( 205, 205, 205 )]" />
    </div>
  )

}

export default SplitterHandler
