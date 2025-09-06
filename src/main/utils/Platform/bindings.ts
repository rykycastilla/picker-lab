import { getPlatform } from './get_platform'
import { Platform } from './Platform'
import { platformRef } from './platform_ref'

const platform: Platform = getPlatform()
platformRef.setValue( platform )

