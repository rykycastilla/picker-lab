export interface ISqlite {

  /**
   * Executes one or multiple SQL statements without returning any result
   */
  exec( query:string ): Promise<void>

  /**
   * Executes a single SQL statement with bound parameters, without returning rows
   */
  run( query:string, args?:object ): Promise<void>

  /**
   * Executes a query that returns multiple rows
   */
  all<T extends object>( query:string, args?:object ): Promise<T[]>

  /**
   * Executes a query that returns a single row if it exists
   */
  get<T extends object>( query:string, args?:object ): Promise<T|undefined>

}
