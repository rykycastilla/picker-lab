import { ColorSaver } from './ColorSaver'
import { Dependencies } from './Dependencies'
import { Menu } from '../domain/Menu'
import { Role } from '../domain/Role'
import { Separator } from '../domain/Separator'
import { StandardMenuItem } from '../domain/StandardMenuItem'

export class FileMenu extends Menu<Dependencies> {

  public readonly name = 'File'

  public readonly content = [
    new ColorSaver( this.context ), new Separator(), new StandardMenuItem( Role.CLOSE ),
  ]

  constructor( context:Dependencies ) {
    super( context )
  }

}
