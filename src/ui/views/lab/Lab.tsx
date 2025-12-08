import ColorIndicator from './components/ColorIndicator'
import ColorInput from './components/ColorInput'
import ColorPaletteSectionList from '@/components/ColorPaletteSectionList'
import { ReactElement } from 'react'
import { TitleBarPortal } from '@/views/app'
import { useColorSaverMenuAction } from './hooks/color_saver_menu_action'
import { useColorSelectionOrder } from './hooks/color_selection_order'

const Lab = (): ReactElement | null => {
  useColorSelectionOrder()
  useColorSaverMenuAction()
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <TitleBarPortal>
        <ColorIndicator />
      </TitleBarPortal>
      <ColorInput />
      <ColorPaletteSectionList type="list" />
    </div>
  )
}

export default Lab
