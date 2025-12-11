import { HSL } from '@/modules/color_codecs/domain'

/**
 * Compares two HSL structs
 * @returns `true` if both are equals
 */
export function compareHsl( a:HSL, b:HSL ): boolean {
  return ( a.hue === b.hue ) && ( a.lightness === b.lightness ) && ( a.saturation === b.saturation )
}
