import Sidebar from './components/Sidebar'
import SidebarToggle from './components/SidebarToggle'
import SplitterHandler from './components/SplitterHandler'
import TitleBar from './components/TitleBar'
import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_RENDER_WIDTH, MIN_SIDEBAR_WIDTH } from '@/constants'
import { Outlet } from 'react-router-dom'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useSidebarOpen, useSidebarWidth } from '@/contexts/sidebar_layout'

const AppLayout = (): ReactElement => {

  const [ sidebarOpen ] = useSidebarOpen()
  const containerRef = useRef<HTMLDivElement|null>( null )
  const [ isResizing, setIsResizing ] = useState( false )
  const [ sidebarWidth, setSidebarWidth ] = useSidebarWidth()
  const [ windowWidth, setWindowWidth ] = useState<number>( window.innerWidth )

  // Detecting window size
  useEffect( () => {
    const onResize = () => setWindowWidth( window.innerWidth )
    window.addEventListener( 'resize', onResize )
    return () => window.removeEventListener( 'resize', onResize )
  }, [] )

  // Auto hiding sidebar with min window size
  const canRenderSidebar = windowWidth >= MIN_SIDEBAR_RENDER_WIDTH

  return (
    <div className="h-screen font-sf">
      <div ref={ containerRef } className="relative flex h-full">
        { canRenderSidebar && <Sidebar width={ sidebarWidth } /> }
        { /* No-sidebar content overlay */ }
        <div
          className={ `absolute inset-0 z-20 flex flex-col min-w-0 bg-[rgb(239,239,239)] dark:bg-[rgb(52,52,52)] ${
            isResizing ? 'duration-0' : 'transition-[margin-left] duration-[250ms] ease-in-out'
          }` }
          style={ { marginLeft: canRenderSidebar && sidebarOpen ? `${ sidebarWidth }px` : 0 } }>
          {
            /* Sidebar separator (SizeHandler) */
            ( canRenderSidebar && sidebarOpen ) && (
              <SplitterHandler
                minPaneWidth={ MIN_SIDEBAR_WIDTH }
                maxPaneWidth={ MAX_SIDEBAR_WIDTH }
                isResizingState={ [ isResizing, setIsResizing ] }
                paneWidthState={ [ sidebarWidth, setSidebarWidth ] }
                paneRef={ containerRef } />
            )
          }
          <TitleBar
            titleButtonsIncluded={ !canRenderSidebar || !sidebarOpen }
            titleButtonsAmount={ canRenderSidebar ? 1 : 0 } />
          { canRenderSidebar && <SidebarToggle /> }
          { /* Work Area */ }
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
