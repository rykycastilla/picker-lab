import { ReactElement, ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  title: string
}

const Section = ( props:SectionProps ): ReactElement => {
  const { children, title } = props
  return (
    <section className="space-y-2">
      <h2 className="text-[15px] font-semibold text-system-text">{ title }</h2>
      <div className="rounded-[12px] border border-system-border overflow-hidden p-4 system-section">
        { children }
      </div>
    </section>
  )
}

export default Section
