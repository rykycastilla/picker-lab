import { ReactElement } from 'react'
import { useRgb } from '@/contexts/selected_color'

const ColorIndicator = (): ReactElement => {

  const [ rgb ] = useRgb()
  const { red, green, blue } = rgb

  return (
    <div className="inline-flex items-center gap-2">
      <div
        aria-label="Color Indicator"
        className="w-10 h-5 border border-system-border shrink-0 rounded-[6px]"
        style={ { backgroundColor: `rgb( ${ red }, ${ green }, ${ blue } )` } } />
      <span className="text-[13px] font-medium text-system-text dark:text-system-text-dark">
        Selected Color
      </span>
    </div>
  )

}

export default ColorIndicator
