import { AvailabilityIndex } from '@/utils/structs/AvailabilityIndex'
import { Color } from '../domain/Color'
import { PublicOf } from '@shared/types/PublicOf'

export class ColorAvailabilityIndex implements IColorAvailabilityIndex {

  private readonly availability = new AvailabilityIndex<string>()

  private genColorStruct( color:Color ): string {
    const { red, green, blue } = color
    return `${ red };${ green };${ blue }`
  }

  public check( target:Color ) {
    const struct: string = this.genColorStruct( target )
    this.availability.check( struct )
  }

  public exists( target:Color ) {
    const struct: string = this.genColorStruct( target )
    return this.availability.exists( struct )
  }

  public free( target:Color ) {
    const struct: string = this.genColorStruct( target )
    this.availability.free( struct )
  }

}

type IColorAvailabilityIndex = PublicOf<AvailabilityIndex<Color>>
