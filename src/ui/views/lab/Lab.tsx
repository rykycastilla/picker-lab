import ColorIndicator from './components/ColorIndicator'
import RgbInput from './components/RgbInput'
import Section from '@/components/Section'
import { ReactElement } from 'react'
import { TitleBarPortal } from '@/views/app'

const Lab = (): ReactElement | null => {
  return (
    <Section title="Color Input">
      <TitleBarPortal>
        <ColorIndicator />
      </TitleBarPortal>
      <RgbInput />
    </Section>
  )
}

export default Lab
