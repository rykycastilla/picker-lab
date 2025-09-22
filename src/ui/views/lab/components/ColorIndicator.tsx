import { ReactElement } from 'react'
import { useRgb } from '@/contexts/selected_color'
import { useSidebarOpen } from '@/contexts/sidebar_layout'

const ColorIndicator = (): ReactElement => {

  const [ isSidebarOpen ] = useSidebarOpen()
  const [ rgb ] = useRgb()
  const { red, green, blue } = rgb

  return (
    <div className="inline-flex items-center gap-2">
      <div
        aria-label="Color Indicator"
        className="w-10 h-5 border border-system-border shrink-0 rounded-[6px]"
        style={ {
          marginLeft: isSidebarOpen ? '1rem' : '0.5rem',
          backgroundColor: `rgb( ${ red }, ${ green }, ${ blue } )` ,
        } } />
      <span className="text-[13px] font-medium text-system-text dark:text-system-text-dark">
        Selected Color
      </span>
    </div>
  )

}

export default ColorIndicator
