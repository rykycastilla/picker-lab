import { readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * List dirs of an specified path
 * @param { string } path
 * @returns { Promise<string[]> }
 */
export async function listDir( path ) {
  const fsItemList = await readdir( path )
  /** @type { string[] } */ const dirList = []
  for( const fsItem of fsItemList ) {
    const fsItemPath = resolve( path, fsItem )
    const isDir = ( await stat( fsItemPath ) ).isDirectory()
    if( isDir ) { dirList.push( fsItem ) }
  }
  return dirList
}
