import { ActionMenuItem } from '@shared/modules/menu/domain/ActionMenuItem'
import { Dependencies } from './Dependencies'
import { MenuItemId } from '@shared/modules/menu/domain/MenuItemId'

export class ColorSaver extends ActionMenuItem<Dependencies> {

  public readonly name = 'Save Color'
  public readonly shortcuts: string[] = [ 'Enter' ]
  public readonly id = MenuItemId[ MenuItemId.COLOR_SAVER ]

  constructor( context:Dependencies ) {
    super( context )
  }

  public onSelect() {
    const { colorSaver } = this.context
    colorSaver.notify()
  }

}
