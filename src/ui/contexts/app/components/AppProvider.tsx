import { PaletteProvider } from '@/contexts/palette'
import { SelectedColorProvider } from '@/contexts/selected_color'
import { SidebarLayoutProvider } from '@/contexts/sidebar_layout'
import { ReactElement, ReactNode, useState } from 'react'
import { ToastProvider } from '@/contexts/toast'
import { useAccentColor } from '@/hooks/accent_color'
import { ViewProvider } from '@/contexts/view'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ( props:AppProviderProps ): ReactElement => {

  const { children } = props
  const [ sidebarLayoutLoaded, setSidebarLayoutLoaded ] = useState( false )
  const [ selectedColorLoaded, setSelectedColorLoaded ] = useState( false )
  const [ viewLoaded, setViewLoaded ] = useState( false )
  const accentColor = useAccentColor()

  const loaded: boolean =
    sidebarLayoutLoaded && selectedColorLoaded && viewLoaded
    && ( accentColor !== null )

  return (
    <ViewProvider onLoad={ () => setViewLoaded( true ) }>
      <SidebarLayoutProvider onLoad={ () => setSidebarLayoutLoaded( true ) }>
        <PaletteProvider>
          <SelectedColorProvider onLoad={ () => setSelectedColorLoaded( true ) }>
            <ToastProvider>
              { /* Rendering UI after sidebar layout load ends and after system accent load */ }
              { loaded && children }
            </ToastProvider>
          </SelectedColorProvider>
        </PaletteProvider>
      </SidebarLayoutProvider>
    </ViewProvider>
  )

}

export default AppProvider
