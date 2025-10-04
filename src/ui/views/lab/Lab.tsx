import ColorIndicator from './components/ColorIndicator'
import ColorInput from './components/ColorInput'
import MainWorkingPaletteSection from './components/MainWorkingPaletteSection'
import { ReactElement } from 'react'
import { TitleBarPortal } from '@/views/app'
import { useKeyboard } from '@/hooks/keyboard'
import { useSelectedColorSaver } from './hooks/selected_color_saver'

const Lab = (): ReactElement | null => {

  const saveSelectedColor = useSelectedColorSaver()

  useKeyboard( () => {
    saveSelectedColor()
  }, [ 'Enter' ] )

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
