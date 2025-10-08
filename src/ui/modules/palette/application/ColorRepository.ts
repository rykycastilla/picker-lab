import { Color } from '../domain/Color'
import { ColorDAO } from './ColorDAO'
import { ColorDTO } from './ColorDTO'
import { ColorMapper } from './ColorMapper'
import { PaletteKeyMapper } from './PaletteKeyMapper'
import { PaletteName } from '../domain/PaletteName'

export class ColorRepository {

  constructor(
    private readonly colorDAO: ColorDAO,
    private readonly colorMapper: ColorMapper,
    private readonly paletteKeyMapper: PaletteKeyMapper,
  ) {}

  /**
   * Saves a new color instance in the database associated to a palette
   */
  public async create( color:Color, palette:PaletteName ) {
    const colorDTO: ColorDTO = this.colorMapper.toDTO( color, palette )
    await this.colorDAO.create( colorDTO )
  }

  /**
   * Gets a list of colors associated with the `palette`
   * @param palette
   */
  public async findByPalette( palette:PaletteName ): Promise<Color[]> {
    // Filtering by palette
    const paletteDTO = this.paletteKeyMapper.toDTO( palette )
    const colorDTOList: ColorDTO[] = await this.colorDAO.filterByPalette( paletteDTO )
    // Mapping dto to model
    return colorDTOList.map( ( colorDTO:ColorDTO ) => {
      const [ color ] = this.colorMapper.toModel( colorDTO )
      return color
    } )
  }

}
