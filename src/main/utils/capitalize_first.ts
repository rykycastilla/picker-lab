/**
 * Converts the first char of a word into upper case
 * @param word
 */
export function capitalizeFirst( word:string ): string {
  const charList: string[] = word.split( '' )
  const [ firstChar, ...restChars ] = charList
  if( firstChar === undefined ) { return '' }
  return [ firstChar.toUpperCase(), ...restChars ].join( '' )
}
