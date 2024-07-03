import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

export const signIn = createAsyncThunk<TUser, TLoginData>(
  'user/sign-in',
  async (data, { rejectWithValue }) => {
    try {
      const result = await loginUserApi(data);
      setCookie(ACCESS_TOKEN_KEY, result.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, result.refreshToken);
      return result.user;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const signUp = createAsyncThunk<TUser, TRegisterData>(
  'user/sign-up',
  async (data, { rejectWithValue }) => {
    try {
      const result = await registerUserApi(data);
      setCookie(ACCESS_TOKEN_KEY, result.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, result.refreshToken);
      return result.user;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const fetchUser = createAsyncThunk<TUser, void>(
  'user/fetch-user',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!token) {
      return rejectWithValue('No token');
    }
    try {
      const result = await getUserApi();
      return result.user;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update-user',
  async (data, { rejectWithValue }) => {
    try {
      const result = await updateUserApi(data);
      return result.user;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
