import { ReactElement } from 'react'
import { TITLE_BAR_HEIGHT } from '@shared/constants'
import { useSidebarOpen } from '@/contexts/sidebar_layout'
import { useWindowDragArea } from '../hooks/window_drag_area'

interface SidebarProps {
  width: number
}

const Sidebar = ( props:SidebarProps ): ReactElement => {
  const { width } = props
  const [ isOpen ] = useSidebarOpen()
  const draggableRef = useWindowDragArea<HTMLDivElement>()
  return (
    <aside
      className={ `relative shrink-0 overflow-hidden` }
      aria-hidden={ !isOpen }
      style={ { width: `${ width }px` } }>
      <div className="h-full border-r border-system-border dark:border-system-border-dark backdrop-blur-system text-system-text dark:text-system-text-dark">
        <div ref={ draggableRef } className="w-full" style={ { height:TITLE_BAR_HEIGHT } } />
        <div className="h-full p-4 flex flex-col" />
      </div>
    </aside>
  )
}

export default Sidebar
