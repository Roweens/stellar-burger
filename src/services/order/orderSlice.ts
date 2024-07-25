import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { OrderSchema } from './orderSchema';
import { createOrder, fetchOrders, fetchProfileOrders } from './services';
import { TFeedsResponse } from '@api';

const initialState: OrderSchema = {
  data: null,
  isLoading: false,
  error: undefined,
  orderModalData: null,
  profileOrders: null,
  feed: {
    total: 0,
    totalToday: 0
  }
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    removeOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(
      fetchOrders.fulfilled,
      (state, action: PayloadAction<TFeedsResponse>) => {
        state.data = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.isLoading = false;
        state.error = undefined;
      }
    );

    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'fetchOrders error';
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(
      fetchProfileOrders.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        state.profileOrders = action.payload;
        state.isLoading = false;
        state.error = undefined;
      }
    );

    builder.addCase(fetchProfileOrders.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(fetchProfileOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'fetchProfileOrders error';

      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(
      createOrder.fulfilled,
      (state, action: PayloadAction<TOrder>) => {
        state.orderModalData = action.payload;
        state.isLoading = false;
        state.error = undefined;
      }
    );

    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'createOrder error';

      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  }
});

export const { actions: orderActions } = orderSlice;
export const { reducer: orderReducer } = orderSlice;
