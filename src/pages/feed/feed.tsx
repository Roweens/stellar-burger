import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { StateSchema, useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/order/services';
import { getOrders } from '../../services/order/selectors';

export const Feed: FC = () => {
  const orders = useSelector(getOrders);
  const isLoading = useSelector((state: StateSchema) => state.order.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetFeeds();
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  if (isLoading || !orders) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
