import { ReactElement, ReactNode, useState } from 'react'
import { RGB } from '../domain/RGB'
import { SelectedColorContext } from '../context'

interface SelectedColorProviderProps {
  children: ReactNode
}

const SelectedColorProvider = ( props:SelectedColorProviderProps ): ReactElement => {
  const { children } = props
  const [ rgb, setRgb ] = useState<RGB>( { red:255, green:0, blue:0 } )
  return (
    <SelectedColorContext.Provider value={ { rgb, setRgb } }>
      { children }
    </SelectedColorContext.Provider>
  )
}

export default SelectedColorProvider
