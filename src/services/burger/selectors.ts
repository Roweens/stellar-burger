import { StateSchema } from '../store';

export const getConstructorItems = (state: StateSchema) =>
  state.burger.burgerConstructor;
