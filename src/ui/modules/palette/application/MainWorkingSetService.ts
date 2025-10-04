import { Color } from '../domain/Color'
import { ColorNameService } from '@/modules/name/application'
import { ColorSet } from './ColorSet'
import { IdGenerator } from './IdGenerator'

/**
 * Represents the main working Area Manager.
 * The main working area is a section that is not a regular palette, but can be used as an entry point
 * to store new colors, before adding it to the destination palette
 */
export class MainWorkingSetService {

  constructor(
    private readonly mainSet: ColorSet,
    private readonly nameService: ColorNameService,
    private readonly idGenerator: IdGenerator,
  ) {}

  /**
   * Creates a new color for the entry for the main working area
   */
  public include( red:number, green:number, blue:number ) {
    // Searching color name
    const name: string = this.nameService.nameIt( red, green, blue )
    // Creating color
    const id: string = this.idGenerator.gen()
    const color = new Color( id, name, red, green, blue )
    // Adding color
    this.mainSet.add( color )
  }

  /**
   * Gets the available colors from the main working set
   */
  public getMainWorkingList(): Color[] {
    return this.mainSet.list
  }

}
