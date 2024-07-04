import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../services/order/services';
import { getProfileOrders } from '../../services/order/selectors';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getProfileOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
