import { ViewContext } from '../context'
import { useContext } from 'react'

/**
 * Gets the current mode of the sections in the app
 */
export function useSectionMode(): 'list' | 'grid' {
  const { sectionMode } = useContext( ViewContext )
  return sectionMode
}
