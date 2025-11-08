import ColorPaletteSectionList from '@/components/ColorPaletteSectionList'
import { ReactElement } from 'react'
import { TitleBarPortal } from '@/views/app'

import ViewToggle from './components/ViewToggle'

const Palette = (): ReactElement => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <TitleBarPortal>
        <ViewToggle />
      </TitleBarPortal>
      <ColorPaletteSectionList />
    </div>
  )
}

export default Palette
