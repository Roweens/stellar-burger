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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from './ProtectedRoute';
import { UnauthorizedRoute } from './UnauthorizedRoute';

export const AppRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;

  const onModalClose = () => {
    navigate(backgroundLocation || '/');
  };

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path={'/'} element={<ConstructorPage />} />
        <Route path={'/feed'} element={<Feed />} />
        <Route
          path={'/login'}
          element={
            <UnauthorizedRoute>
              <Login />
            </UnauthorizedRoute>
          }
        />
        <Route
          path={'/register'}
          element={
            <UnauthorizedRoute>
              <Register />
            </UnauthorizedRoute>
          }
        />
        <Route
          path={'/forgot-password'}
          element={
            <UnauthorizedRoute>
              <ForgotPassword />
            </UnauthorizedRoute>
          }
        />
        <Route
          path={'/reset-password'}
          element={
            <UnauthorizedRoute>
              <ResetPassword />
            </UnauthorizedRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile/orders'}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path={'*'} element={<NotFound404 />} />
        <Route
          path={'/feed/:number'}
          element={
            <Modal title='Информация о заказе' onClose={onModalClose}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path={'/profile/orders/:number'}
          element={
            <ProtectedRoute>
              <Modal title='Информация о заказе' onClose={onModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />

        <Route
          path={'/ingredients/:id'}
          element={
            <Modal title='Описание ингредиента' onClose={onModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path={'/ingredients/:id'}
            element={
              <Modal title='Описание ингредиента' onClose={onModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={'/feed/:number'}
            element={
              <Modal title='Информация о заказе' onClose={onModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={'/profile/orders/:number'}
            element={
              <ProtectedRoute>
                <Modal title='Информация о заказе' onClose={onModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};
