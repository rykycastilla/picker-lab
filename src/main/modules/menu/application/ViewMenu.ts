import { DEVELOPMENT } from '@/constants'
import { Menu } from '../domain/Menu'
import { Role } from '../domain/Role'
import { Separator } from '../domain/Separator'
import { StandardMenuItem } from '../domain/StandardMenuItem'

export class ViewMenu extends Menu {

  public readonly name = 'View'

  public readonly content = [
    ... DEVELOPMENT ? [
      new StandardMenuItem( Role.RELOAD ),
      new StandardMenuItem( Role.TOGGLE_DEV_TOOLS ),
      new Separator(),
    ] : [],
    new StandardMenuItem( Role.TOGGLE_FULL_SCREEN ),
  ]

}
