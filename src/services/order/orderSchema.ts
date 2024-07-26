import { TOrder } from '@utils-types';

export type OrderSchema = {
  isLoading: boolean;
  data: TOrder[] | null;
  error?: string;
  orderModalData: TOrder | null;
  profileOrders: TOrder[] | null;
  feed: {
    total: number;
    totalToday: number;
  };
};
