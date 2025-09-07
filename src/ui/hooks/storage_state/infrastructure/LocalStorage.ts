import { Storage } from '../application/Storage'

export class LocalStorage implements Storage {

  constructor(
    public readonly KEY: string,
  ) {}

  public set( value:string ) {
    localStorage.setItem( this.KEY, value )
  }

  public get(): string | null {
    return localStorage.getItem( this.KEY )
  }

}
