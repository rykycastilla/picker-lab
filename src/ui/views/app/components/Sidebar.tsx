import color from '@assets/icons/color.svg'
import picker from '@assets/icons/picker.svg'
import SidebarItem from './SidebarItem'
import SidebarSectionTitle from './SidebarSectionTitle'
import { ReactElement } from 'react'
import { TITLE_BAR_HEIGHT } from '@shared/constants'
import { useSidebarOpen } from '@/contexts/sidebar_layout'
import { useWindowDragArea } from '@/hooks/window_drag_area'

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
        <div className="h-full p-4 flex flex-col">
          { /* Sidebar Nav Items */ }
          <SidebarSectionTitle>Working Area</SidebarSectionTitle>
          <nav className="space-y-1 mb-6">
            <SidebarItem icon={ picker } name="Lab" to="/lab" />
            <SidebarItem icon={ color } name="Colors" to="/colors" />
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
