import { Color, ColorCrudEvent, ReservedPalette } from '@/modules/palette/domain'
import { PaletteContext } from '../context'
import { useContext, useEffect, useMemo, useState } from 'react'

/**
 * Provides a list of the current colors in the main working palette
 * @returns A color list from the main working palette
 */
export function useMainPalette(): Color[] {

  const { controller } = useContext( PaletteContext )

  const defaultList = useMemo<Color[]>( () => {
    return controller.getMainWorkingList()
  }, [] )  // eslint-disable-line

  const [ list, setList ] = useState( defaultList )

  // Updating Main Working Palette list when it has changed
  useEffect( () => {
    const handleMainWorkingCrud = ( event:ColorCrudEvent ) => setList( event.list )
    controller.addCrudListener( ReservedPalette.MAIN_WORKING_SET, handleMainWorkingCrud )
    return () => controller.removeCrudListener( ReservedPalette.MAIN_WORKING_SET, handleMainWorkingCrud )
  }, [ controller ] )

  return list

}
