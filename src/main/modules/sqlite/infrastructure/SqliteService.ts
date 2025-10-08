import { ISqlite } from '@shared/modules/sqlite/application'
import { SqliteDB } from '@/utils/infrastructure/SqliteDB'

export class SqliteService implements ISqlite {

  private readonly database = new SqliteDB( 'app.db', 'RgbColor.sql' )

  public async exec( query:string ) {
    this.database.exec( query )
  }

  public async run( query:string, args?:object ) {
    this.database.prepare<object,undefined>( query ).run( args ?? {} )
  }

  public async all<T extends object>( query:string, args?:object ): Promise<T[]> {
    return this.database.prepare<object,T>( query ).all( args ?? {} )
  }

  public async get<T extends object>( query:string, args?:object ): Promise<T|undefined> {
    return this.database.prepare<object,T>( query ).get( args ?? {} )
  }

}
