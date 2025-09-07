import { Ref } from '@shared/utils/structs/Ref'
import { useEffect, useState } from 'react'

async function notifyResolution( promise:Promise<unknown>, resolvePromiseRef:Ref<boolean>, callback:() => void ) {
  await promise
  // Only resolves if it was not aborted
  if( resolvePromiseRef.value ) { callback() }
}

/**
 * Says `true` if the promise was resolved
 * @warning This only tracks resolution, not rejection
 */
export function usePromiseResolved( promise:Promise<unknown> ): boolean {
  const [ resolved, setResolved ] = useState( false )
  // Resolving promise
  useEffect( () => {
    setResolved( false )
    const resolvePromiseRef = new Ref<boolean>( true )  // Used to notify aborts
    notifyResolution( promise, resolvePromiseRef, () => setResolved( true ) )
    // Aborting when the promise changes
    return () => { resolvePromiseRef.setValue( false ) }
  }, [ promise ] )
  return resolved
}
