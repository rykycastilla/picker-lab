import { link } from './link.js'
import { styleText } from 'node:util'

async function main() {
  await link()
  console.log(
    'Use', styleText( [ 'blue' ], 'npm run link' ), 'to recompile native libs',
  )
  console.log( 'Use it if you solve native issues and after native code modifications to apply changes' )
}

async function handleExit() {
  console.log(
    styleText( [ 'red' ], 'Interumpting native libs linking.' ),
    'Please use',
    styleText( [ 'blue' ], 'npm run link' ),
    'to ensure native libraries will be compiled',
  )
}

process.on( 'SIGINT', async() => {
  console.log( '\n' )
  await handleExit()
  process.exit()
} )

main()
