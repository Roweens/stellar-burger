import { TUser } from '@utils-types';

export type SessionSchema = {
  isLoading: boolean;
  error?: string;
  isAuth: boolean;
  isMounted: boolean;
  userData: TUser | null;
};
