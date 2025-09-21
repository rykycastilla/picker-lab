import { spawn } from 'node:child_process'

/**
 * @module make
 * Wrapper to run Electron maker without special arguments (only vanilla config)
 */

async function main() {
  const makeProcess = spawn( 'npx', [ 'electron-forge', 'make' ], { stdio:'inherit' } )
  // Handling process cancel
  process.on( 'SIGINT', () => {
    makeProcess.kill( 'SIGINT' )
    process.exit()
  } )
}

main()
