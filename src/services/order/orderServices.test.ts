import { TFeedsResponse, TNewOrderResponse } from '@api';
import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { orderReducer } from './orderSlice';
import { createOrder, fetchOrders, fetchProfileOrders } from './services';
import { sessionReducer } from '../session/sessionSlice';

describe('order Services actions test', () => {
  beforeEach(() => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'accessToken=mockToken'
    });
  });

  test('fetch Orders result test', async () => {
    const expectedResult: TFeedsResponse = {
      orders: [
        {
          _id: '66a013a3119d45001b4fb2d5',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-07-23T20:33:39.433Z',
          updatedAt: '2024-07-23T20:33:39.881Z',
          number: 47076
        },
        {
          _id: '66a01505119d45001b4fb2dc',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-07-23T20:39:33.959Z',
          updatedAt: '2024-07-23T20:39:34.531Z',
          number: 47080
        }
      ],
      success: true,
      total: 2,
      totalToday: 2
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult)
    }) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    const thunk = fetchOrders();
    await thunk(store.dispatch, () => ({}), undefined);

    const { data, isLoading, error, feed } = store.getState().order;

    expect(data).toEqual(expectedResult.orders);
    expect(isLoading).toEqual(false);
    expect(error).toBeUndefined();
    expect(feed.total).toEqual(expectedResult.total);
    expect(feed.totalToday).toEqual(expectedResult.totalToday);
  });
  test('fetch Orders isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    store.dispatch(fetchOrders());
    const { isLoading, error } = store.getState().order;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('fetch Orders error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false })
    }) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    const thunk = fetchOrders();
    await thunk(store.dispatch, () => ({}), undefined);

    const { isLoading, error } = store.getState().order;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('fetchOrders error');
  });

  test('fetch Profile Orders result test', async () => {
    const expectedResult: TFeedsResponse = {
      orders: [
        {
          _id: '66a013a3119d45001b4fb2d5',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-07-23T20:33:39.433Z',
          updatedAt: '2024-07-23T20:33:39.881Z',
          number: 47076
        },
        {
          _id: '66a01505119d45001b4fb2dc',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-07-23T20:39:33.959Z',
          updatedAt: '2024-07-23T20:39:34.531Z',
          number: 47080
        }
      ],
      success: true,
      total: 2,
      totalToday: 2
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult)
    }) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    const thunk = fetchProfileOrders();
    await thunk(store.dispatch, () => ({}), undefined);

    const { profileOrders, isLoading, error } = store.getState().order;
    expect(error).toBeUndefined();
    expect(profileOrders).toEqual(expectedResult.orders);
    expect(isLoading).toEqual(false);
  });
  test('fetch Profile Orders isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    store.dispatch(fetchProfileOrders());
    const { isLoading, error } = store.getState().order;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('fetch Profile Orders error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false })
    }) as jest.Mock;

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    const thunk = fetchProfileOrders();
    await thunk(store.dispatch, () => ({}), undefined);

    const { isLoading, error } = store.getState().order;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('fetchProfileOrders error');
  });

  test('create Order result test', async () => {
    const expectedResult: TNewOrderResponse = {
      success: true,
      name: 'Флюоресцентный люминесцентный бургер',
      order: {
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
        _id: '66a29b18119d45001b4fb98a',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-07-25T18:36:08.846Z',
        updatedAt: '2024-07-25T18:36:09.295Z',
        number: 47369
      }
    };
    const orderIds = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(expectedResult)
    }) as jest.Mock;

    const store = configureStore({
      preloadedState: {
        session: {
          isAuth: true,
          isLoading: false,
          isMounted: true,
          userData: {
            email: 'testUser@gmail.com',
            name: 'testUser'
          }
        }
      },
      reducer: { order: orderReducer, session: sessionReducer }
    });

    const thunk = createOrder(orderIds);
    await thunk(store.dispatch, store.getState, undefined);

    const { orderModalData, isLoading, error } = store.getState().order;
    expect(error).toBeUndefined();
    expect(orderModalData).toEqual(expectedResult.order);
    expect(isLoading).toEqual(false);
  });
  test('create Order isLoading test', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve() })
    ) as jest.Mock;
    const orderIds = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'];

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    store.dispatch(createOrder(orderIds));
    const { isLoading, error } = store.getState().order;

    expect(isLoading).toEqual(true);
    expect(error).toBeUndefined();
  });
  test('create Order error test', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ success: false })
    }) as jest.Mock;
    const orderIds = ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'];

    const store = configureStore({
      reducer: { order: orderReducer }
    });

    const thunk = createOrder(orderIds);
    await thunk(store.dispatch, () => ({}), undefined);

    const { isLoading, error } = store.getState().order;

    expect(isLoading).toEqual(false);
    expect(error).toEqual('createOrder error');
  });
});
