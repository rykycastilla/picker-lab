import ColorIndicator from './components/ColorIndicator'
import ColorInput from './components/ColorInput'
import MainWorkingPaletteSection from './components/MainWorkingPaletteSection'
import { ReactElement } from 'react'
import { TitleBarPortal } from '@/views/app'
import { useColorSelectionOrder } from './hooks/color_selection_order'

const Lab = (): ReactElement | null => {
  useColorSelectionOrder()
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <TitleBarPortal>
        <ColorIndicator />
      </TitleBarPortal>
      <ColorInput />
      <MainWorkingPaletteSection />
    </div>
  )
}

export default Lab
