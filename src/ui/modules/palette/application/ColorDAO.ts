import { ColorDTO } from './ColorDTO'

export interface ColorDAO {
  create( color:ColorDTO ): Promise<void>
  filterByPalette( palette:string ): Promise<ColorDTO[]>
}
