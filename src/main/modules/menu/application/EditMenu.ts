import { Menu } from '../domain/Menu'
import { Role } from '../domain/Role'
import { Separator } from '../domain/Separator'
import { StandardMenuItem } from '../domain/StandardMenuItem'

export class EditMenu extends Menu {

  public readonly label = 'Edit'

  public readonly submenu = [
    new StandardMenuItem( Role.UNDO ),
    new StandardMenuItem( Role.REDO ),
    new Separator(),
    new StandardMenuItem( Role.CUT ),
    new StandardMenuItem( Role.COPY ),
    new StandardMenuItem( Role.PASTE ),
    new StandardMenuItem( Role.SELECT_ALL ),
  ]

}
