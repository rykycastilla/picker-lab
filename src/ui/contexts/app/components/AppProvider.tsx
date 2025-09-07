import { SidebarLayoutProvider } from '@/contexts/sidebar_layout'
import { ReactElement, ReactNode, useState } from 'react'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ( props:AppProviderProps ): ReactElement => {
  const { children } = props
  const [ loaded, setLoaded ] = useState( false )
  return (
    <SidebarLayoutProvider onLoad={ () => setLoaded( true ) }>
      { loaded && children }
    </SidebarLayoutProvider>
  )
}

export default AppProvider
