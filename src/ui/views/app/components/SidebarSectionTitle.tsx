import { ReactElement } from 'react'

interface SidebarSectionTitleProps {
  children: string
}

const SidebarSectionTitle = ( props:SidebarSectionTitleProps ): ReactElement => {
  const { children } = props
  return (
    <div className="px-2 mb-2 text-[11px] tracking-[0.08em] font-semibold uppercase text-black/50 dark:text-white/40 select-none">
      { children }
    </div>
  )
}

export default SidebarSectionTitle
