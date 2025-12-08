import { BrowserWindow } from 'electron'

/**
 * Event object associated to the Browser Window of Electron
 * @template T  OptionalType: Alternative type for the `window`
 */
export class WindowEvent<T extends BrowserWindow|null = BrowserWindow> {

  public readonly timeStamp = Date.now()

  constructor(
    public readonly window: BrowserWindow | T,
  ) {}

}
