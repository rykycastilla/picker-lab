import { SqliteEvent, SqliteExecArgs, SqliteListener, SqliteParamArgs } from './SqliteEvent'
import { SqliteService } from './SqliteService'

/**
 * Receives Sqlite instructions from the Renderer to be executed by the main process
 */
@SqliteListener
export class SqliteApiManager {

  private readonly database = new SqliteService()

  @SqliteEvent( 'exec' )
  protected async onExec( _event:object, args:SqliteExecArgs ) {
    const { query } = args
    await this.database.exec( query )
  }

  @SqliteEvent( 'run' )
  protected async onRun( _event:object, args:SqliteParamArgs ) {
    const { query, params } = args
    await this.database.run( query, params )
  }

  @SqliteEvent( 'get' )
  protected onGet( _event:object, args:SqliteParamArgs ): Promise<object|undefined> {
    const { query, params } = args
    return this.database.get( query, params )
  }

  @SqliteEvent( 'all' )
  protected onAll( _event:object, args:SqliteParamArgs ): Promise<object[]> {
    const { query, params } = args
    return this.database.all( query, params )
  }

}
