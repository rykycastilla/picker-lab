import HexInput from './HexInput'
import HslInput from './HslInput'
import RgbInput from './RgbInput'
import Section from '@/components/Section'
import { ReactElement } from 'react'

const ColorInput = (): ReactElement => {
  return (
    <Section title="Color Input">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-row-2 gap-6">
          <RgbInput />
          <HslInput />
          <HexInput />
        </div>
      </div>
    </Section>
  )
}

export default ColorInput
