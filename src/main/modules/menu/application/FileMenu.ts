import { Menu } from '../domain/Menu'
import { Role } from '../domain/Role'
import { StandardMenuItem } from '../domain/StandardMenuItem'

export class FileMenu extends Menu {

  public readonly label = 'File'
  public readonly submenu = [ new StandardMenuItem( Role.CLOSE ) ]

}
