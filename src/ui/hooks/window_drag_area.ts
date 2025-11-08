import { RefObject, useEffect, useRef } from 'react'

/**
 * A hook that makes an element a draggable area for the window.
 * @param isDragArea  Set `false` to indicate that this element must be ignored as part of the drag area
 * @returns A ref to be attached to the draggable element.
 */
export function useWindowDragArea<T extends HTMLElement>( isDragArea = true ): RefObject<T|null> {
  const draggableRef = useRef<T|null>( null )
  useEffect( () => {
    const draggable: T | null = draggableRef.current
    if( draggable === null ) { return }
    draggable.style.setProperty( '-webkit-app-region', isDragArea ? 'drag' : 'no-drag' )
  }, [ draggableRef, isDragArea ] )
  return draggableRef
}
