import { ColorSaver } from './ColorSaver'
import { Dependencies } from './Dependencies'
import { Menu } from '@shared/modules/menu/domain/Menu'
import { Role } from '@shared/modules/menu/domain/Role'
import { Separator } from '@shared/modules/menu/domain/Separator'
import { StandardMenuItem } from '@shared/modules/menu/domain/StandardMenuItem'

export class FileMenu extends Menu<Dependencies> {

  public readonly name = 'File'

  public readonly content = [
    new ColorSaver( this.context ), new Separator(), new StandardMenuItem( Role.CLOSE ),
  ]

  constructor( context:Dependencies ) {
    super( context )
  }

}
