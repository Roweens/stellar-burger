import { ReactNode } from 'react';
import { useSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuth } from '../services/session/selectors';

export const UnauthorizedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const from = location.state?.from;

  const isAuthenticated = useSelector(getIsAuth);

  if (isAuthenticated) {
    return <Navigate to={from || '/'} state={{ from: location }} replace />;
  }

  return children;
};
