import { Menu } from './Menu'
import { MenuItem } from './MenuItem'

type ItemSchema<T extends object> = Menu<T> | MenuItem<T>

/**
 * Collection of valid elements that represents a full menu
 * @template T  Dependencies
 */
export type MenuSchema<T extends object = object> = ItemSchema<T>[]
