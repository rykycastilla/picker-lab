/**
 * @template T  `Menu`
 */
export interface ContextMenuManager<T extends object> {

  /**
   * Show a context menu with the provided `schema`
   * @param schema
   * @returns  An identifier of the selected menu item or `null` if nothing was selected (click out)
   */
  show( target:T ): Promise<string|null>

}
