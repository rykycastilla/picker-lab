import { Color } from '../domain/Color'
import { ColorDTO } from './ColorDTO'
import { PaletteKeyMapper } from './PaletteKeyMapper'
import { PaletteName } from '../domain/PaletteName'

export class ColorMapper {

  constructor(
    private readonly paletteKeyMapper: PaletteKeyMapper,
  ) {}

  /**
   * Transforms color models into data transfer object with palette (raw string key)
   */
  public toDTO( model:Color, palette:PaletteName ): ColorDTO {
    const { id, name, red, green, blue } = model
    const paletteDTO = this.paletteKeyMapper.toDTO( palette )
    return { id, name, red, green, blue, palette:paletteDTO }
  }

  /**
   * Transforms data transfer objects of color into a color model with it palette
   */
  public toModel( dto:ColorDTO ): [ Color, PaletteName ] {
    const { id, name, red, green, blue, palette } = dto
    return [
      new Color( id, name, red, green, blue ),
      this.paletteKeyMapper.toModel( palette ),
    ]
  }

}
