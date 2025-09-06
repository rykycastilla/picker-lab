import { Platform } from './Platform'
import { platformRef } from './platform_ref'

export class PlatformService {

  /**
   * Checks if the current platform matches the specified platform.
   */
  public static checkIs( platform:Platform ): boolean {
    return this.current === platform
  }

  /**
   * Current platform
   */
  static get current(): Platform {
    return platformRef.value
  }

}
