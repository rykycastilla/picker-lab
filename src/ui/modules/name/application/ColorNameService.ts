export interface ColorNameService {

  /**
   * Resolves a name for the specified `RGB` color.
   * If the color does not exist it will be `'unknown'`
   */
  nameIt( red:number, green:number, blue:number ): string

}
