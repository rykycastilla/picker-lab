import { SelectedColorProvider } from '@/contexts/selected_color'
import { SidebarLayoutProvider } from '@/contexts/sidebar_layout'
import { ReactElement, ReactNode, useState } from 'react'
import { useAccentColor } from '@/hooks/accent_color'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ( props:AppProviderProps ): ReactElement => {
  const { children } = props
  const [ sidebarLayoutLoaded, setSidebarLayoutLoaded ] = useState( false )
  const [ selectedColorLoaded, setSelectedColorLoaded ] = useState( false )
  const accentColor = useAccentColor()
  const loaded: boolean = sidebarLayoutLoaded && selectedColorLoaded && ( accentColor !== null )
  return (
    <SidebarLayoutProvider onLoad={ () => setSidebarLayoutLoaded( true ) }>
      <SelectedColorProvider onLoad={ () => setSelectedColorLoaded( true ) }>
        { /* Rendering UI after sidebar layout load ends and after system accent load */ }
        { loaded && children }
      </SelectedColorProvider>
    </SidebarLayoutProvider>
  )
}

export default AppProvider
