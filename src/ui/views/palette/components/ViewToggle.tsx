import grid from '@assets/icons/grid.svg'
import list from '@assets/icons/list.svg'
import { ReactSVG } from 'react-svg'
import { ReactElement } from 'react'
import { useSectionMode, useSectionModeHandlers } from '@/contexts/view'
import { useWindowDragArea } from '@/hooks/window_drag_area'
import './ViewToggle.css'

interface ViewOptionProps {
  icon: string
  selected: boolean
  select(): void
}

const ViewOption = ( props:ViewOptionProps ): ReactElement => {
  const { icon, selected, select } = props
  return (
    <button
      onClick={ select }
      aria-pressed={ selected }
      className={ `relative z-10 inline-flex items-center justify-center w-9 h-8 rounded-[6px] transition ${
        selected ? 'bg-black/20' : ''
      }` }>
      <div className={ `w-4 h-4 transition ${ selected ? 'opacity-100' : 'opacity-70 group-hover:opacity-90' }` }>
        <ReactSVG className="view-option-svg text-[dimgray] dark:text-[#a0a0a0] w-4 h-4" src={ icon } />
      </div>
    </button>
  )
}

const ViewToggle = (): ReactElement => {

  const viewMode = useSectionMode()
  const noDraggableRef = useWindowDragArea<HTMLDivElement>( false )
  const { setList, setGrid } = useSectionModeHandlers()

  return (
    <div ref={ noDraggableRef } className="relative inline-flex items-center rounded-[12px] group">
      { /* Hover of elements container */ }
      <div className="absolute inset-0 rounded-[5px] bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
      { /* Elements */ }
      <ViewOption icon={ list } selected={ viewMode === 'list' } select={ setList } />
      <ViewOption icon={ grid } selected={ viewMode === 'grid' } select={ setGrid } />
    </div>
  )

}

export default ViewToggle
