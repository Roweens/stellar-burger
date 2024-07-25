import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionSchema } from './sessionSchema';
import {
  ACCESS_TOKEN_KEY,
  fetchUser,
  REFRESH_TOKEN_KEY,
  signIn,
  signUp,
  updateUser
} from './services';
import { TUser } from '@utils-types';
import { deleteCookie } from '../../utils/cookie';

const initialState: SessionSchema = {
  isAuth: false,
  isLoading: false,
  error: undefined,
  userData: null,
  isMounted: false
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.isAuth = false;
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      deleteCookie(ACCESS_TOKEN_KEY);
    }
  },
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<TUser>) => {
      state.isAuth = true;
      state.isLoading = false;
      state.error = undefined;
      state.userData = action.payload;
    });

    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<TUser>) => {
      state.isAuth = true;
      state.isLoading = false;
      state.error = undefined;
      state.userData = action.payload;
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.isAuth = true;
        state.isLoading = false;
        state.error = undefined;
        state.userData = action.payload;
        state.isMounted = true;
      }
    );

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'signIn error';
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'signUp error';

      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'fetchUser error';

      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
      state.isMounted = true;
    });

    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.error = undefined;
        state.userData = action.payload;
      }
    );
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'updateUser error';

      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  }
});

export const { actions: sessionActions } = sessionSlice;
export const { reducer: sessionReducer } = sessionSlice;
