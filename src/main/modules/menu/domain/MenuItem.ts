import { ActionMenuItem } from './ActionMenuItem'
import { Separator } from './Separator'
import { StandardMenuItem } from './StandardMenuItem'

export type MenuItem<T extends object = object> = ActionMenuItem<T> | Separator | StandardMenuItem
