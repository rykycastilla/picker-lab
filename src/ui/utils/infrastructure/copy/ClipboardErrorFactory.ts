import { ClipboardError } from './ClipboardError'

/**
 * This is only a factory for `ClipboardError`,
 * this is not a traditional *subclass*
 * it cannot be constructed and must not be used as `ClipboardError`
 */
export class ClipboardErrorFactory extends ClipboardError {

  public static create( targetText:string ): ClipboardError {
    return new ClipboardError( targetText )
  }

}
