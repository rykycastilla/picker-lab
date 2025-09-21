import { access } from 'node:fs/promises'

/**
 * Checks a file exists
 * @param { string } path
 * @returns { Promise<boolean> }  `boolean` Promise that represents if the file exists
 */
export async function checkFileExists( path ) {
  try {
    await access( path )
    return true
  }
  catch {
    return false
  }
}
