export interface MenuService {
  checkEnabled( id:string ): boolean
  enable( id:string ): void
  disable( id:string ): void
}
