import { RGB } from '../domain/RGB'

/**
 * Makes transformations between RGB and another color spectrum
 */
export interface RgbCodec<T> {
  encode( color:T ): RGB
  decode( color:RGB ): T
}
