import { SqliteApiManager } from './SqliteApiManager'

/**
 * Starts listening the Sqlite instructions from the Renderer
 * to be executed by the main process
 */
export function runSqliteApiManagerService() {
  new SqliteApiManager()
}
