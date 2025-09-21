export class ColorCheckerLoadError extends Error {
  constructor() {
    super( 'UiColorChecker native lib cannot be loaded' )
  }
}
