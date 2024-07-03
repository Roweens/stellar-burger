import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Modal, OrderInfo, IngredientDetails } from '@components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute>
        <ResetPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile/orders',
    element: (
      <ProtectedRoute>
        <ProfileOrders />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: (
      <ProtectedRoute>
        <NotFound404 />
      </ProtectedRoute>
    )
  },
  {
    path: '/feed/:number',
    element: (
      <Modal title='Order info' onClose={() => {}}>
        <OrderInfo />
      </Modal>
    )
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='Ingredients Details' onClose={() => {}}>
        <IngredientDetails />
      </Modal>
    )
  },
  {
    path: '/profile/orders/:number',
    element: (
      <ProtectedRoute>
        <Modal title='Ingredients Details' onClose={() => {}}>
          <OrderInfo />
        </Modal>
      </ProtectedRoute>
    )
  }
]);
