export class ClipboardError extends Error {

  protected constructor(
    public readonly targetText: string,
  ) {
    super( `Cannot copy ${ targetText } to the Clipboard` )
  }

}
