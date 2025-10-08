import { createRequire } from 'node:module'
import { Database as IDatabase } from './Database'

const require = createRequire( import.meta.url )
const Database: DatabaseConstructor = require( 'better-sqlite3' )

type Database = IDatabase

interface DatabaseConstructor {
  new ( filePath:string, config:{ verbose:( message:string ) => void } ): Database
}

export default Database
