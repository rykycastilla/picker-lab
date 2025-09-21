import { SidebarLayoutProvider } from '@/contexts/sidebar_layout'
import { ReactElement, ReactNode, useState } from 'react'
import { useAccentColor } from '@/hooks/accent_color'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ( props:AppProviderProps ): ReactElement => {
  const { children } = props
  const [ loaded, setLoaded ] = useState( false )
  const accentColor = useAccentColor()
  return (
    <SidebarLayoutProvider onLoad={ () => setLoaded( true ) }>
      { /* Rendering UI after sidebar layout load ends and after system accent load */ }
      { ( loaded && ( accentColor !== null ) ) && children }
    </SidebarLayoutProvider>
  )
}

export default AppProvider
