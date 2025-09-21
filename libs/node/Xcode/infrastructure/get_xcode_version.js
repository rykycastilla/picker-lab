import { exec } from 'node:child_process'
import { XcodeCompiler } from './XcodeCompiler.js'

/**
 * @returns { Promise<string|null> }
 */
function getVersionOutput() {
  return new Promise( ( resolve ) => {
    exec( `${ XcodeCompiler.XCODE } -version`, ( err, stdout ) => {
      if( err !== null ) { resolve( null ) }
      else if( typeof stdout === 'string' ) { resolve( stdout ) }
      else { resolve( null ) }
    } )
  } )
}

/**
 * Extracts the Xcode version from a given text. `xcodebuild -version` output expected
 * @param { string } text
 * @returns { string | null }  The version string or `null` if not found
 */
function extractXcodeVersion( text ) {
  // Fidnign Xcode version pattern
  const re = /Xcode[\s\S]*?(\d+\.\d+(?:\.\d+)?)/
  const m = re.exec( text )
  return m ? m[ 1 ] : null
}

/**
 * Gets the version code of Xcode or `null` if it is not installed in the system
 * @returns { Promise<string|null> }
 */
export async function getXcodeVersion() {
  const versionOutput = await getVersionOutput()
  if( versionOutput === null ) { return null }
  return extractXcodeVersion( versionOutput )
}
