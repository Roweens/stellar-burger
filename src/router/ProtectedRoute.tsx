import { ReactNode } from 'react';
import { useSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuth } from '../services/session/selectors';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const isAuthenticated = useSelector(getIsAuth);

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
