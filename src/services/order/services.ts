import {
  TFeedsResponse,
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getIsAuth } from '../session/selectors';
import { StateSchema } from '../store';

export const fetchOrders = createAsyncThunk<TFeedsResponse, void>(
  'order/all',
  getFeedsApi
);

export const fetchProfileOrders = createAsyncThunk<TOrder[], void>(
  'order/fetch-profile-orders',
  getOrdersApi
);

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create-order',
  async (data, { rejectWithValue, getState }) => {
    const isAuth = getIsAuth(getState() as StateSchema);

    if (!isAuth) {
      return rejectWithValue('not auth');
    }

    const result = await orderBurgerApi(data);
    return result.order;
  }
);
