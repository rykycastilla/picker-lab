import HexInput from './HexInput'
import HslInput from './HslInput'
import RgbInput from './RgbInput'
import Section from '@/components/Section'
import { ReactElement } from 'react'

const ColorInput = (): ReactElement => {
  return (
    <Section title="Color Input">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-col-2 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RgbInput />
            <HslInput />
          </div>
          <HexInput />
        </div>
      </div>
    </Section>
  )
}

export default ColorInput
