import { Codec } from './Codec'
import { Storage } from './Storage'

export class StorageManager<T> {

  constructor(
    private readonly codec: Codec<T>,
    private readonly storage: Storage,
  ) {}

  public save( value:T ) {
    const data: string = this.codec.encode( value )
    this.storage.set( data )
  }

  public get(): T | undefined {
    const data: string | null = this.storage.get()
    if( data === null ) { return undefined }
    return this.codec.decode( data )
  }

}
