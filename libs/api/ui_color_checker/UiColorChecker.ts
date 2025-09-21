import { ColorCheckerLoadError } from './ColorCheckerLoadError'
import { ColorEvent } from './ColorEvent'
import { PublicOf } from '@shared/types/PublicOf'
import { Resolver } from '@/utils/Resolver'
import { UiColorCheckerEventEmitter } from './UiColorCheckerEventEmitter'

export class UiColorChecker implements Emitter {

  private readonly emitter = new UiColorCheckerEventEmitter()
  private readonly firstAccentLoaded = new Resolver<boolean>()

  #accent: string | null = null

  constructor() {
    this.setAccentUpdater()
    this.setLoaderRejecter()
  }

  private setAccentUpdater() {
    this.addEventListener( 'accent', ( event:ColorEvent ) => {
      const { value } = event
      this.firstAccentLoaded.resolve( true )
      this.setAccent( value )
    } )
  }

  /**
   * Rejects the `firstAccentLoad` promise if a load error occurs
  */
  private setLoaderRejecter() {
    this.emitter.onloaderror = () => {
      this.firstAccentLoaded.resolve( false )
    }
  }

  public addEventListener( type:'accent', handle:( event:ColorEvent ) => void ) {
    this.emitter.addEventListener( type, handle )
  }

  public removeEventListener( type:'accent', handle:( event:ColorEvent ) => void ) {
    this.emitter.removeEventListener( type, handle )
  }

  /**
   * Current `accent` value of MacOS system.
   * Promise that resolves when the first value is loaded.
   * @throws { ColorCheckerLoadError } The promise is rejected if the API is not available (not in MacOS)
   */
  public async getAccent(): Promise<string|null> {
    const loaded: boolean = await this.firstAccentLoaded.promise
    if( !loaded ) { throw new ColorCheckerLoadError() }
    return this.#accent
  }

  private setAccent( accent:string|null ) {
    this.#accent = accent
  }

}

type Emitter = PublicOf<Omit<UiColorCheckerEventEmitter,'onloaderror'>>
