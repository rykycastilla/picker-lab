import { ActionMenuItem } from '../domain/ActionMenuItem'
import { Dependencies } from './Dependencies'

export class ColorSaver extends ActionMenuItem<Dependencies> {

  public readonly name = 'Save Color'
  public readonly shortcuts: string[] = [ 'Enter' ]

  constructor( context:Dependencies ) {
    super( context )
  }

  public onSelect() {
    const { colorSaver } = this.context
    colorSaver.notify()
  }

}
