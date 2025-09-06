import { Platform } from './Platform'

/**
 * Gets the current platform using process node API
 */
export function getPlatform(): Platform {
  const { platform } = process
  if( platform === 'linux' ) { return Platform.LINUX }
  else if( platform === 'darwin' ) { return Platform.MAC }
  else if( platform === 'win32' ) { return Platform.WINDOWS }
  else { return Platform.UNKNOWN }
}
