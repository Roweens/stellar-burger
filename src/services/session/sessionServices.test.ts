import { TAuthResponse, TLoginData, TRegisterData } from '@api';
import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { sessionReducer } from '../session/sessionSlice';
import { fetchUser, signIn, signUp, updateUser } from './services';

describe('session Services actions test', () => {
  test('sign in result test', async () => {
    const expectedResult: TAuthResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      success: true,
      user: {
        email: 'testUser@gmail.com',
        name: 'testUser'
      }
    };

    const params: TLoginData = {
      email: 'testUser@gmail.com',
      password: 'qwerty'
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult)
    }) as jest.Mock;

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    const thunk = signIn(params);
    await thunk(store.dispatch, store.getState, undefined);

    const { isAuth, isLoading, error, userData } = store.getState().session;

    expect(isAuth).toEqual(true);
    expect(isLoading).toEqual(false);
    expect(error).toBeUndefined();
    expect(userData).toEqual(expectedResult.user);
  });
  test('sign in isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;

    const params: TLoginData = {
      email: 'testUser@gmail.com',
      password: 'qwerty'
    };

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    store.dispatch(signIn(params));
    const { isLoading, error } = store.getState().session;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('sign in error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false })
    }) as jest.Mock;

    const params: TLoginData = {
      email: 'testUser@gmail.com',
      password: 'qwerty'
    };

    const store = configureStore({
      reducer: { session: sessionReducer }
    });
    const thunk = signIn(params);
    await thunk(store.dispatch, store.getState, undefined);

    const { isLoading, error, isAuth } = store.getState().session;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('signIn error');
  });

  test('sign up result test', async () => {
    const expectedResult: TAuthResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      success: true,
      user: {
        email: 'testUser@gmail.com',
        name: 'testUser'
      }
    };

    const params: TRegisterData = {
      email: 'testUser@gmail.com',
      password: 'qwerty',
      name: 'testUser'
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult)
    }) as jest.Mock;

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    const thunk = signUp(params);
    await thunk(store.dispatch, store.getState, undefined);

    const { isAuth, isLoading, error, userData } = store.getState().session;

    expect(isAuth).toEqual(true);
    expect(isLoading).toEqual(false);
    expect(error).toBeUndefined();
    expect(userData).toEqual(expectedResult.user);
  });
  test('sign up isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;

    const params: TRegisterData = {
      email: 'testUser@gmail.com',
      password: 'qwerty',
      name: 'testUser'
    };

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    store.dispatch(signUp(params));
    const { isLoading, error } = store.getState().session;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('sign up error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false })
    }) as jest.Mock;

    const params: TRegisterData = {
      email: 'testUser@gmail.com',
      password: 'qwerty',
      name: 'testUser'
    };

    const store = configureStore({
      reducer: { session: sessionReducer }
    });
    const thunk = signUp(params);
    await thunk(store.dispatch, store.getState, undefined);

    const { isLoading, error } = store.getState().session;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('signUp error');
  });

  test('fetchUser result test', async () => {
    const expectedResult: TAuthResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      success: true,
      user: {
        email: 'testUser@gmail.com',
        name: 'testUser'
      }
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult)
    }) as jest.Mock;

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    const thunk = fetchUser();
    await thunk(store.dispatch, store.getState, undefined);

    const { isAuth, isLoading, error, userData } = store.getState().session;

    expect(isAuth).toEqual(true);
    expect(isLoading).toEqual(false);
    expect(error).toBeUndefined();
    expect(userData).toEqual(expectedResult.user);
  });
  test('fetchUser isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    store.dispatch(fetchUser());
    const { isLoading, error } = store.getState().session;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('fetchUser error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false })
    }) as jest.Mock;

    const store = configureStore({
      reducer: { session: sessionReducer }
    });
    const thunk = fetchUser();
    await thunk(store.dispatch, store.getState, undefined);

    const { isLoading, error } = store.getState().session;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('fetchUser error');
  });

  test('updateUser result test', async () => {
    const expectedResult: TAuthResponse = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      success: true,
      user: {
        email: 'testUser@gmail.com',
        name: 'testUser'
      }
    };

    const params: Partial<TRegisterData> = {
      name: 'testUserChanged'
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult)
    }) as jest.Mock;

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    const thunk = updateUser(params);
    await thunk(store.dispatch, store.getState, undefined);

    const { isAuth, isLoading, error, userData } = store.getState().session;

    expect(isLoading).toEqual(false);
    expect(error).toBeUndefined();
    expect(userData).toEqual(expectedResult.user);
  });
  test('updateUser isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;

    const params: Partial<TRegisterData> = {
      name: 'testUserChanged'
    };

    const store = configureStore({
      reducer: { session: sessionReducer }
    });

    store.dispatch(updateUser(params));
    const { isLoading, error } = store.getState().session;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('updateUser error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false })
    }) as jest.Mock;

    const params: Partial<TRegisterData> = {
      name: 'testUserChanged'
    };

    const store = configureStore({
      reducer: { session: sessionReducer }
    });
    const thunk = updateUser(params);
    await thunk(store.dispatch, store.getState, undefined);

    const { isLoading, error } = store.getState().session;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('updateUser error');
  });
});
