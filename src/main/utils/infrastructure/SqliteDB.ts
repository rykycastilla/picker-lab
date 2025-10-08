import Database from '@/libs/better-sqlite3'
import { APP_PATH, DATABASE_PATH, DEVELOPMENT, USER_DATA_PATH } from '@/constants'
import { join, resolve } from 'node:path'
import { readFileSync } from 'node:fs'

/**
 * Manages the connection to an SQLite database file and handles the injection of primary tables
 * defined during the construction of the database object.
 */
export class SqliteDB extends Database {

  public readonly FILE_PATH: string

  /**
   * @param filename The name of the database file.
   * @param tableNames Names of the tables to be injected.
   */
  constructor( filename:string, ...tableNames:string[] ) {
    const filePath: string = SqliteDB.buildFilePath( filename )
    super( filePath, { verbose: console.log } )
    this.FILE_PATH = filePath
    for( const table of tableNames ) {
      this.loadTable( table )
    }
  }

  /**
   * Loads a table schema into the database from a file.
   * @param tableName The name of the table.
   */
  private loadTable( tableName:string ) {
    const tablePath: string = resolve( DATABASE_PATH, tableName )
    const command: string = readFileSync( tablePath, 'utf-8' )
    this.exec( command )
  }

  /**
   * Builds the file path for the SQLite database based on the environment type.
   * @param filename The name of the database file.
   */
  private static buildFilePath( filename:string ): string {
    if( DEVELOPMENT ) { return resolve( APP_PATH, filename ) }
    return join( USER_DATA_PATH, filename )
  }

}
