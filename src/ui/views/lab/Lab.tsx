import { ReactElement } from 'react'

import Section from '@/components/Section'
import RgbInput from './components/RgbInput'

const Lab = (): ReactElement | null => {
  return (
    <Section title="Color Input">
      <RgbInput />
    </Section>
  )
}

export default Lab
