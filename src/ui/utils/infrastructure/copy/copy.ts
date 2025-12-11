import { ClipboardError } from './ClipboardError'
import { ClipboardErrorFactory } from './ClipboardErrorFactory'

/**
 * Copies `text` to the Clipboard
 * @param text
 * @throws { ClipboardError }  You have not permission or clipboard is not available
 */
export async function copy( text:string ) {
  try {
    await navigator.clipboard.writeText( text )
  }
  catch {
    const error: ClipboardError = ClipboardErrorFactory.create( text )
    throw error
  }
}
