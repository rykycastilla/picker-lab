import { Color } from '../domain/Color'
import { ColorCrudEmitterService } from '../application/ColorCrudEmitterService'
import { ColorCrudEvent } from '../domain/ColorCrudEvent'
import { ColorNamer } from '@/modules/name/infrastructure'
import { ColorSet } from '../application/ColorSet'
import { CryptoIdGenerator } from './CryptoIdGenerator'
import { MainWorkingSetService } from '../application/MainWorkingSetService'
import { PaletteName } from '../domain/PaletteName'
import { PublicOf } from '@shared/types/PublicOf'

export class PaletteController
implements PublicOf<MainWorkingSetService>, PublicOf<ColorCrudEmitterService> {

  private readonly mainWorkingSetService: MainWorkingSetService
  private readonly colorCrudEmitterService: ColorCrudEmitterService

  constructor() {
    // Creating main working set service
    const mainSet = new ColorSet()  // This is the default location when a new color is "included" in the palette system
    const nameService = new ColorNamer()
    const idGenerator = new CryptoIdGenerator()
    this.mainWorkingSetService = new MainWorkingSetService( mainSet, nameService, idGenerator )
    // Creating color CRUD emitter service
    this.colorCrudEmitterService = new ColorCrudEmitterService( mainSet )
  }

  public include( red:number, green:number, blue:number ) {
    this.mainWorkingSetService.include( red, green, blue )
  }

  public getMainWorkingList(): Color[] {
    return this.mainWorkingSetService.getMainWorkingList()
  }

  public addCrudListener( palette:PaletteName, handle:( event:ColorCrudEvent ) => Promise<void> | void ) {
    this.colorCrudEmitterService.addCrudListener( palette, handle )
  }

  public removeCrudListener( palette:PaletteName, handle:( event:ColorCrudEvent ) => Promise<void> | void ) {
    this.colorCrudEmitterService.removeCrudListener( palette, handle )
  }

}
