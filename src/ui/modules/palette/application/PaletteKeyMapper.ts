import { ColorDTO } from './ColorDTO'
import { PaletteName } from '../domain/PaletteName'
import { ReservedPalette } from '../domain/ReservedPalette'

export class PaletteKeyMapper {

  private static readonly RESERVED = 'RESERVED'
  private static readonly NAME = 'NAME'

  /**
   * Transforms palette names into a raw string
   */
  public toDTO( model:PaletteName ): ColorDTO[ 'palette' ] {
    if( typeof model === 'string' ) { return `${ PaletteKeyMapper.NAME }@${ model }` }
    return `${ PaletteKeyMapper.RESERVED }@${ ReservedPalette[ model ] }`
  }

  /**
   * Transforms raw strings with palette names pattern into valid palette names
   */
  public toModel( dto:ColorDTO[ 'palette' ] ): PaletteName {
    const [ identifier, ...nameSegments ] = dto.split( '@' )
    const name: string = nameSegments.join( '@' )
    // Using enum if identifier is "RESERVED"
    if( identifier === PaletteKeyMapper.RESERVED ) {
      return ReservedPalette[ name as keyof typeof ReservedPalette ]
    }
    return name
  }

}
