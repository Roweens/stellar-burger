import {
  TFeedsResponse,
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getIsAuth } from '../session/selectors';
import { StateSchema } from '../store';

export const fetchOrders = createAsyncThunk<TFeedsResponse, void>(
  'order/all',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getFeedsApi();
      return result;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const fetchProfileOrders = createAsyncThunk<TOrder[], void>(
  'order/fetch-profile-orders',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getOrdersApi();
      return result;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create-order',
  async (data, { rejectWithValue, getState }) => {
    const isAuth = getIsAuth(getState() as StateSchema);

    if (!isAuth) {
      return rejectWithValue('not auth');
    }
    try {
      const result = await orderBurgerApi(data);
      return result.order;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);
