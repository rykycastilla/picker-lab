export interface ColorEvent {
  status: 'MULTICOLOR' | 'SUCCESS'| 'INVALID_COLOR'
  value: string | null
  timeStamp: number
}
