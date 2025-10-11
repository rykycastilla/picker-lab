import { Role } from './Role'

/**
 * Predefined Menu item with a specific role
 */
export class StandardMenuItem {

  public readonly role: string

  constructor(
    role:Role,
    public readonly id?: string,
  ) {
    const roleName: string = Role[ role ]
    const roleWords: string[] = roleName.split( '_' )
    for( let i = 0; i < roleWords.length; i++ ) {
      if( i === 0 ) { continue }
      const word: string = roleWords[ i ]!
      roleWords[ i ] = StandardMenuItem.capitalizeFirst( word )
    }
    this.role = roleWords.join( '' )
  }

  private static capitalizeFirst( word:string ): string {
    const charList: string[] = word.split( '' )
    const [ firstChar, ...restChars ] = charList
    if( firstChar === undefined ) { return '' }
    return [ firstChar.toUpperCase(), ...restChars ].join( '' )
  }

}
