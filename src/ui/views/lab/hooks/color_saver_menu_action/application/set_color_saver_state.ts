import { ColorSaverMenuItem } from './ColorSaverMenuItem'
import { Ref } from '@shared/utils/structs/Ref'

/**
 * Enables or disables the color saver item if at least one component
 * in the current (focused) window is requesting activation
 * @param activeComponentsRef  Number of components requesting the activation of color saver
 * @param hasFocusRef  Focus state of the window
 * @param colorSaver  Service for enabling/disabling the color saver item
 */
export function setColorSaverState(
  activeComponentsRef:Ref<number>, colorSaver:ColorSaverMenuItem,
) {
  const activeComponents: number = activeComponentsRef.value
  if( activeComponents > 0 ) { colorSaver.enable() }
  else { colorSaver.disable() }
}
