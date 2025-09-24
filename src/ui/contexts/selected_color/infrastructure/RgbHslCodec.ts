import { HSL } from '../domain/HSL'
import { RGB } from '../domain/RGB'
import { RgbCodec } from '../application/RgbCodec'

export class RgbHslCodec implements RgbCodec<HSL> {

  public encode( color:HSL ): RGB {
    const { hue, saturation, lightness } = color
    const s = saturation / 100
    const l = lightness / 100
    const c = ( 1 - Math.abs( 2 * l - 1 ) ) * s
    const x = c * ( 1 - Math.abs( ( hue / 60 ) % 2 - 1 ) )
    const m = l - c / 2
    let r = 0, g = 0, b = 0
    if ( hue >= 0 && hue < 60 ) {
      r = c; g = x; b = 0
    } else if ( hue >= 60 && hue < 120 ) {
      r = x; g = c; b = 0
    } else if ( hue >= 120 && hue < 180 ) {
      r = 0; g = c; b = x
    } else if ( hue >= 180 && hue < 240 ) {
      r = 0; g = x; b = c
    } else if ( hue >= 240 && hue < 300 ) {
      r = x; g = 0; b = c
    } else if ( hue >= 300 && hue < 360 ) {
      r = c; g = 0; b = x
    }
    return {
      red: Math.round( ( r + m ) * 255 ),
      green: Math.round( ( g + m ) * 255 ),
      blue: Math.round( ( b + m ) * 255 ),
    }
  }

  public decode( color:RGB ): HSL {
    const r = color.red / 255
    const g = color.green / 255
    const b = color.blue / 255
    const max = Math.max( r, g, b )
    const min = Math.min( r, g, b )
    const delta = max - min
    let hue = 0
    if ( delta !== 0 ) {
      if ( max === r ) {
        hue = 60 * ( ( ( g - b ) / delta ) % 6 )
      } else if ( max === g ) {
        hue = 60 * ( ( b - r ) / delta + 2 )
      } else if ( max === b ) {
        hue = 60 * ( ( r - g ) / delta + 4 )
      }
    }
    if ( hue < 0 ) {
      hue += 360
    }
    const lightness = ( max + min ) / 2
    let saturation = 0
    if ( delta !== 0 ) {
      saturation = delta / ( 1 - Math.abs( 2 * lightness - 1 ) )
    }
    return {
      hue: Math.round( hue ),
      saturation: Math.round( saturation * 100 ),
      lightness: Math.round( lightness * 100 ),
    }
  }

}
