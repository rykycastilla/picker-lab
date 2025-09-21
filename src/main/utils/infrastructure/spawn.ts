import { spawn as nodeSpawn, ChildProcessWithoutNullStreams } from 'node:child_process'
import { styleText } from 'node:util'

type ChildProcess = ChildProcessWithoutNullStreams

/**
 * Spawn processes (using binaries) safely
 * @returns The node child process or `null` if the binary is broken (cannot be executed)
 */
export function spawn( bin:string ): Promise<ChildProcess|null> {
  return new Promise<ChildProcess|null>( ( resolve ) => {
    const process: ChildProcess = nodeSpawn( bin )
    process.once( 'error', () => {
      console.log( styleText( [ 'yellow' ], 'WARNING:' ), `Binary ${ bin } cannot be initialized` )
      resolve( null )
    } )
    process.once( 'spawn', () => resolve( process ) )
  } )
}

export { ChildProcess }
