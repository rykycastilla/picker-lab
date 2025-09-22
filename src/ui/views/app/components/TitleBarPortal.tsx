import Portal from '@/components/Portal'
import { ReactElement, ReactNode } from 'react'
import { WORK_AREA_TITLE_BAR } from '@/constants'

interface TitleBarPortalProps {
  children: ReactNode
}

const TitleBarPortal = ( props:TitleBarPortalProps ): ReactElement => {
  const { children } = props
  return (
    <Portal target={ `#${ WORK_AREA_TITLE_BAR }` }>
      { children }
    </Portal>
  )
}

export default TitleBarPortal
