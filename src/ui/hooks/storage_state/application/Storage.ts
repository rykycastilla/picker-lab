export interface Storage {
  set( value:string ): void
  get(): string | null
}
