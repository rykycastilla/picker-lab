import { ReactElement } from 'react'

interface SidebarProps {
  width: number
  isOpen: boolean
}

const Sidebar = ( props:SidebarProps ): ReactElement => {
  const { width, isOpen } = props
  return (
    <aside
      className={ `relative shrink-0 overflow-hidden` }
      aria-hidden={ !isOpen }
      style={ { width: `${ width }px` } }>
      <div className="h-full border-r border-system-border dark:border-system-border-dark backdrop-blur-system text-system-text dark:text-system-text-dark">
        <div className="h-full p-4 flex flex-col">
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
