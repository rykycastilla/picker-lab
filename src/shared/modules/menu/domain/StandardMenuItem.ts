import { Role } from './Role'

/**
 * Predefined Menu item with a specific role
 */
export class StandardMenuItem {

  constructor(
    public readonly role: Role,
    public readonly id?: string,
  ) {}

}
