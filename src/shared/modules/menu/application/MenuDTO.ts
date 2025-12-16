import { MenuItemDTO } from './MenuItemDTO'

export interface MenuDTO {
  name: string
  content: Array<MenuItemDTO|MenuDTO>
}
