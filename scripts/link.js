import { checkIsMain } from '../libs/node/check_is_main.js'
import { linkMacLibs } from './link_mac_libs.js'

/**
 * @param { string[] } args
 */
async function main( ...args ) {
  await link( ...args )
}

/**
 * @param { string[] } libList
 */
export async function link( ...libList ) {
  if( process.platform === 'darwin' ) {
    await linkMacLibs( ...libList )
  }
  else {
    console.log( `There aren't available native libs for this platform (${ process.platform })` )
  }
}

// Executing Main
const isMain = checkIsMain( import.meta.url )
if( isMain ) {
  const [ _node, _script, ...args ] = process.argv  // eslint-disable-line
  main( ...args )
}
