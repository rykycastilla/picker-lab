import { RGB } from '../domain/RGB'
import { RgbCodec as IRgbCodec } from '../application/RgbCodec'

/**
 * Template to be used in standard components that require a `RgbCodec` interface
 * WARNING: It is only a template, cannot make conversions
 */
export class RgbCodec implements IRgbCodec<RGB> {

  public encode( color:RGB ): RGB {
    return color
  }

  public decode( color:RGB ): RGB {
    return color
  }

}
