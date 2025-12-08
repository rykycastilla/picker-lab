import { ColorSaverMenuItem } from './ColorSaverMenuItem'
import { MenuService } from '@shared/modules/menu/application'
import { ReactiveRef } from '@/utils/structs/ReactiveRef'
import { setColorSaverState } from './set_color_saver_state'

/**
 * Manages active components capable of request the color saver activation.
 * If there is at least one active component and the window is focused, the activation wil occur
 */
export class ActiveComponentsManager {

  /** Number of components capable of enabling the color saver */
  private readonly activeComponentsRef = new ReactiveRef( 0 )

  constructor( menuService:MenuService ) {
    const colorSaver = new ColorSaverMenuItem( menuService )
    // Updating color saver visibility state when changes are detected
    const updateState = () => setColorSaverState( this.activeComponentsRef, colorSaver )
    this.activeComponentsRef.addEventListener( 'update', updateState )
  }

  /**
   * Adds an active component to enable the color saver
   */
  public add() {
    const activeComponents: number = this.activeComponentsRef.value
    this.activeComponentsRef.setValue( activeComponents + 1 )
  }

  /**
   * Quits an active component to enable the color saver
   */
  public quit() {
    const activeComponents: number = this.activeComponentsRef.value
    this.activeComponentsRef.setValue( activeComponents - 1 )
  }

}
