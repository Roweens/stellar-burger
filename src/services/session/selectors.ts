import { StateSchema } from '../store';

export const getIsAuth = (state: StateSchema) => state.session.isAuth || false;
export const getUserData = (state: StateSchema) => state.session.userData;

export const getIsMounted = (state: StateSchema) =>
  state.session.isMounted || false;
