import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setUserName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
