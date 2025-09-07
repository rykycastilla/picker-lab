import { JSONCodec } from './infrastructure/JSONCodec'
import { LocalStorage } from './infrastructure/LocalStorage'
import { StorageManager } from './application/StorageManager'
import { useMemo } from 'react'

export function useStorageManager<T>( key:string ): StorageManager<T> {
  return useMemo( () => {
    const codec = new JSONCodec<T>()
    const storage = new LocalStorage( key )
    return new StorageManager<T>( codec, storage )
  }, [ key ] )
}
