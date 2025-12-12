import { CSSProperties } from 'react'
import { Shape } from '../domain/Shape'

export class Decoration {

  constructor(
    public readonly shape: Shape,
    public readonly color: CSSProperties[ 'color' ],
  ) {}

}
