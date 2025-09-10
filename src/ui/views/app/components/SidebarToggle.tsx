import sidebarDark from '@assets/icons/sidebar_dark.svg'
import sidebarLight from '@assets/icons/sidebar_light.svg'
import { ReactElement } from 'react'
import { TITLE_BAR_HEIGHT } from '@shared/constants'
import { TRAFFIC_LIGHTS_PLACEHOLDER} from '@/constants'
import { useFullScreen } from '@/hooks/full_screen'
import { useSidebarOpen } from '@/contexts/sidebar_layout'
import { useWindowDragArea } from '../hooks/window_drag_area'
import { useWindowFocus } from '@/hooks/window_focus'
import './SidebarToggle.css'

const SidebarToggle = (): ReactElement => {

  const [ isOpen, setIsOpen ] = useSidebarOpen()
  const handleToggle = () => setIsOpen( !isOpen )
  const noDraggableRef = useWindowDragArea<HTMLDivElement>( false )
  const hasFocus = useWindowFocus()
  const isFullScreen = useFullScreen()

  return (
    <div
      ref={ noDraggableRef }
      className="sidebar-toggle fixed top-0 z-50 flex items-center px-4"
      style={ {
        height: TITLE_BAR_HEIGHT,
        left: isFullScreen ? 0 : TRAFFIC_LIGHTS_PLACEHOLDER,  // Reserving space for traffic lights in window mode
        opacity: hasFocus ? 1 : 0.6,
      } }>
      <button
        onClick={ handleToggle}
        aria-label={ isOpen ? 'Hide sidebar' : 'Show sidebar' }
        className={ `
        inline-flex items-center justify-center w-8 h-8 rounded-[5px] transition-all cursor-pointer
       hover:bg-black/10 dark:hover:bg-black/30 hover:backdrop-blur-system
        hover:backdrop-brightness-90 dark:hover:backdrop-brightness-75
        ` }>
        <img src={ sidebarLight } alt="Sidebar" className="w-5 h-5 dark:hidden" />
        <img src={ sidebarDark } alt="Sidebar" className="w-5 h-5 hidden dark:block" />
      </button>
    </div>
  )

}

export default SidebarToggle
