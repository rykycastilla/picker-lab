import { ContextMenuService } from '../application/ContextMenuService'
import { CryptoIdGenerator } from '@/modules/id/infrastructure'
import { MenuSchemaMapper } from './MenuSchemaMapper'

export class ContextMenuServiceFactory {

  private static instance: ContextMenuService | null = null

  public static getInstance(): ContextMenuService {
    if( this.instance === null ) {
      const idGenerator = new CryptoIdGenerator()
      const mapper = new MenuSchemaMapper()
      this.instance = new ContextMenuService(
        api.contextMenuRequester, idGenerator, mapper,
      )
    }
    return this.instance
  }

}
