import { IdGenerator } from '../application/IdGenerator'

export class CryptoIdGenerator implements IdGenerator {

  public gen(): string {
    const array = new Uint8Array( 16 )
    crypto.getRandomValues( array )
    const binaryIdList: string[] = Array.from( array, ( byte:number ) => {
      return byte.toString( 16 ).padStart( 2, '0' )
    } )
    return binaryIdList.join( '' )
  }

}
