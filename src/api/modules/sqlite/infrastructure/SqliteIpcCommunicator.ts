import { ipcRenderer } from 'electron'
import { ISqlite } from '@shared/modules/sqlite/application'

export class SqliteIpcCommunicator implements ISqlite {

  public async exec( query:string ) {
    await ipcRenderer.invoke( 'sqlite-exec', { query } )
  }

  public async run( query:string, args?:object ) {
    await ipcRenderer.invoke( 'sqlite-run', { query, params:args } )
  }

  public async get<T>( query:string, args?:object ): Promise<T|undefined> {
    return ipcRenderer.invoke( 'sqlite-get', { query, params:args } )
  }

  public async all<T>( query:string, args?:object ): Promise<T[]> {
    return ipcRenderer.invoke( 'sqlite-all', { query, params:args } )
  }

}
