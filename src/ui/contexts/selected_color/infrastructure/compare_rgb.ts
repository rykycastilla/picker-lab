import { RGB } from '@/modules/color_codecs/domain/RGB'

/**
 * Compares two RGB structs
 * @returns `true` if both are equals
 */
export function compareRgb( a:RGB, b:RGB ): boolean {
  return ( a.red === b.red ) && ( a.green === b.green ) && ( a.blue === b.blue )
}
