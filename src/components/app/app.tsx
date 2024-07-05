import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { AppRouter } from '../../router/AppRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUser } from '../../services/session/services';
import { Preloader } from '../ui/preloader';
import { getIsMounted } from '../../services/session/selectors';
import { fetchIngredients } from '../../services/ingredients/fetchIngredients';

const App = () => {
  const dispatch = useDispatch();
  const isMounted = useSelector(getIsMounted);

  useEffect(() => {
    if (!isMounted) {
      dispatch(fetchUser());
      dispatch(fetchIngredients());
    }
  }, [isMounted, dispatch]);

  if (!isMounted) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRouter />
    </div>
  );
};

export default App;
