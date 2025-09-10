import { ReactElement } from 'react'
import { TITLE_BAR_HEIGHT } from '@shared/constants'
import { TRAFFIC_LIGHTS_PLACEHOLDER } from '@/constants'
import { useFullScreen } from '@/hooks/full_screen'

interface SidebarTitleButtonsPlaceholderProps {
  buttonsAmount: number
}

const SidebarTitleButtonsPlaceholder = ( props:SidebarTitleButtonsPlaceholderProps ): ReactElement => {
  const { buttonsAmount } = props
  const isFullScreen = useFullScreen()
  // Hiding traffic lights placeholder in full screen
  const trafficLightsPlaceholder = isFullScreen ? 0 : TRAFFIC_LIGHTS_PLACEHOLDER
  return (
    <div
      style={ {
        width: trafficLightsPlaceholder + TITLE_BAR_HEIGHT * buttonsAmount,
        height: TITLE_BAR_HEIGHT,
      } } />
  )
}

export default SidebarTitleButtonsPlaceholder
