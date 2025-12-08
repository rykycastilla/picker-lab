export interface MenuService {
  checkEnabled( item:string ): boolean
  enable( item:string ): void
  disable( item:string ): void
}
