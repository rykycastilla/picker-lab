export interface ShouldSaveColorListener {
  type: 'should-save-color'
  handle(): Promise<void> | void
}
