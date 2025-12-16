/**
 * Make optional the specified `Property` of the provided `Interface`.
 * To do this with multiple properties you need to include them separated by a `|`
 * @template T  `Interface`
 * @template U  `Property`
 */
export type Nullify<T extends object,U extends keyof T> = Omit<T,U> & Partial<Pick<T,U>>
