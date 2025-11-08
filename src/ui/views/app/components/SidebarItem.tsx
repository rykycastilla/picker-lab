import { Link, useLocation } from 'react-router-dom'
import { ReactElement } from 'react'
import { ReactSVG } from 'react-svg'
import { useAccentColor } from '@/hooks/accent_color'
import { useWindowFocus } from '@/hooks/window_focus'
import { WINDOW_BLUR_UI_OPACITY } from '@/constants'
import './SidebarItem.css'

const SELECTED_ITEM_CLASS = 'rounded-[8px] bg-[rgba(0,0,0,0.085)] dark:bg-[rgba(0,0,0,0.255)]'

interface SidebarItemsProps {
  icon: string
  name: string
  to: string
}

const SidebarItem = ( props:SidebarItemsProps ): ReactElement => {

  const { icon, name, to } = props
  const { pathname } = useLocation()
  const hasFocus = useWindowFocus()
  const accentColor = useAccentColor()

  return (
    <Link
      to={ to }
      className={
        `sidebar-item system-sidebar-item flex items-center gap-2 ${
          pathname.startsWith( to ) ? SELECTED_ITEM_CLASS : ''
        }` }
      draggable={ false }
      style={ {
        opacity: hasFocus ? 1 : WINDOW_BLUR_UI_OPACITY,
      } }>
      <ReactSVG
        src={ icon }
        className="sidebar-item-icon w-4 h-4 opacity-80 shrink-0"
        style={ { color:accentColor } as object } />
      <span>{ name }</span>
    </Link>
  )

}

export default SidebarItem
