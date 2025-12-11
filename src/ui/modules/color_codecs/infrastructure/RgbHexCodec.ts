import { NULL_RGB } from '../constants'
import { RGB } from '../domain/RGB'
import { RgbCodec } from '../application/RgbCodec'

export class RgbHexCodec implements RgbCodec<string> {

  private static readonly HEX_LENGTH = 6

  /**
   * Transforms a hex color code (without #) into a RGB
   * WARNING: if the passed value is not supported by hex color pattern, the result will be `NULL_RGB`, a base RGB struct
   */
  public encode( color:string ): RGB {
    const charList: string[] = color.split( '' )
    if( charList.length !== RgbHexCodec.HEX_LENGTH ) { return NULL_RGB }
    const chanelList: number[] = []
    // Processing color chanels
    for( let i = 0; i < RgbHexCodec.HEX_LENGTH; i += 2 ) {
      const firstHexChar: string = charList[ i ]!
      const secondHexChar: string = charList[ i + 1 ]!
      const hexChanel: string = firstHexChar + secondHexChar
      const numericChanel: number = parseInt( hexChanel, 16 )
      if( isNaN( numericChanel ) ) { return NULL_RGB }
      chanelList.push( numericChanel )
    }
    // Building strcut
    const [ red, green, blue ] = chanelList as [ number, number, number ]
    return { red, green, blue }
  }

  private genHexChanel( rgbChanel:number ): string {
    return rgbChanel.toString( 16 ).padStart( 2, '0' )
  }

  /**
   * Transforms a RGB color code into a hex
   */
  public decode( color:RGB ): string {
    const { red, green, blue } = color
    return this.genHexChanel( red ) + this.genHexChanel( green ) + this.genHexChanel( blue )
  }

}
