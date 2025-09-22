import SidebarTitleButtonsPlaceholder from './SidebarTitleButtonsPlaceholder'
import { ReactElement } from 'react'
import { TITLE_BAR_HEIGHT } from '@shared/constants'
import { useWindowDragArea } from '../hooks/window_drag_area'
import { useWindowFocus } from '@/hooks/window_focus'
import { WORK_AREA_TITLE_BAR } from '@/constants'

interface TitleBarProps {
  titleButtonsIncluded: boolean
  titleButtonsAmount: number
}

const TitleBar = ( props:TitleBarProps ): ReactElement => {
  const { titleButtonsIncluded, titleButtonsAmount } = props
  const draggableRef = useWindowDragArea<HTMLDivElement>()
  const hasFocus = useWindowFocus()
  const darkBgColor = hasFocus ? 'rgb( 60, 55, 55 )' : 'rgb( 50, 45, 45 )'
  const lightBgColor = hasFocus ? 'rgb( 244, 240, 240 )' : 'rgb( 233, 230, 229 )'
  return (
    <div
      ref={ draggableRef }
      className={ `border-b border-b-[rgb(205,205,205)] dark:border-b-[rgb(14,14,14)] bg-[var(--title-bar-light-bg)] dark:bg-[var(--title-bar-dark-bg)]` }
      style={ {
        height: TITLE_BAR_HEIGHT,
        '--title-bar-dark-bg': darkBgColor,
        '--title-bar-light-bg': lightBgColor,
      } as object }>
      <div className="h-full flex items-center">
        { titleButtonsIncluded && (
          <SidebarTitleButtonsPlaceholder buttonsAmount={ titleButtonsAmount } />
        ) }
        <div id={ WORK_AREA_TITLE_BAR } className="flex items-center gap-2" />
      </div>
    </div>
  )
}

export default TitleBar
