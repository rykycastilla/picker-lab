import namer from 'color-namer'
import { ColorNameService } from '../application/ColorNameService'

export class ColorNamer implements ColorNameService {

  public static readonly UNKNOWN = 'unknown'

  private checkRange( channel:number ): boolean {
    return ( 0 <= channel ) && ( channel <= 255 )
  }

  private checkColorRange( red:number, green:number, blue:number ): boolean {
    const redInRange: boolean = this.checkRange( red )
    const greenInRange: boolean = this.checkRange( green )
    const blueInRange: boolean = this.checkRange( blue )
    return redInRange && greenInRange && blueInRange
  }

  public nameIt( red:number, green:number, blue:number ): string {
    // Checking valid range
    const isInRange: boolean = this.checkColorRange( red, green, blue )
    if( !isInRange ) { return ColorNamer.UNKNOWN }
    // Building color code and searching name
    const rgb = `rgb( ${ red }, ${ green }, ${ blue } )`
    const { html } = namer( rgb )
    // Using the most similar color founded
    const [ mostSimilarColor ] = html
    if( mostSimilarColor === undefined ) { return ColorNamer.UNKNOWN }
    return mostSimilarColor.name
  }

}
