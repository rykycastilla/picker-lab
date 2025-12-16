import { Menu } from '@shared/modules/menu/domain/Menu'
import { Role } from '@shared/modules/menu/domain/Role'
import { Separator } from '@shared/modules/menu/domain/Separator'
import { StandardMenuItem } from '@shared/modules/menu/domain/StandardMenuItem'

export class EditMenu extends Menu {

  public readonly name = 'Edit'

  public readonly content = [
    new StandardMenuItem( Role.UNDO ),
    new StandardMenuItem( Role.REDO ),
    new Separator(),
    new StandardMenuItem( Role.CUT ),
    new StandardMenuItem( Role.COPY ),
    new StandardMenuItem( Role.PASTE ),
    new StandardMenuItem( Role.SELECT_ALL ),
  ]

}
