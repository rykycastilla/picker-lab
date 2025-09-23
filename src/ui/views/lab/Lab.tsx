import ColorIndicator from './components/ColorIndicator'
import ColorInput from './components/ColorInput'
import { ReactElement } from 'react'
import { TitleBarPortal } from '@/views/app'

const Lab = (): ReactElement | null => {
  return (
    <>
      <TitleBarPortal>
        <ColorIndicator />
      </TitleBarPortal>
      <ColorInput />
    </>
  )
}

export default Lab
