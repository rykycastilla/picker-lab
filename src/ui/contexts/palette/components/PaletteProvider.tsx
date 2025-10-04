import { PaletteContext } from '../context'
import { ReactElement, ReactNode } from 'react'
import { useController } from '../hooks/controller'

interface PaletteProviderProps {
  children: ReactNode
}

const PaletteProvider = ( props:PaletteProviderProps ): ReactElement => {
  const { children } = props
  const controller = useController()
  return (
    <PaletteContext value={ { controller } }>
      { children }
    </PaletteContext>
  )
}

export default PaletteProvider
