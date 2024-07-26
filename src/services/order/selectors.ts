import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../store';

export const getOrders = (state: StateSchema) => state.order.data || [];

export const getOrderError = (state: StateSchema) => state.order.error;
export const getOrderIsLoading = (state: StateSchema) => state.order.isLoading;

export const getOrderModalData = (state: StateSchema) =>
  state.order.orderModalData;

export const getFeed = (state: StateSchema) => state.order.feed;

export const getProfileOrders = (state: StateSchema) =>
  state.order.profileOrders || [];

export const getProfileOrderByNumber = createSelector(
  getProfileOrders,
  (state: StateSchema, number?: number) => number,
  (orders, number) => orders?.find((order) => order.number === number)
);

export const getFeedOrderByNumber = createSelector(
  getOrders,
  (state: StateSchema, number?: number) => number,
  (orders, number) => orders?.find((order) => order.number === number)
);
