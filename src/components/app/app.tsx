import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { AppRouter } from '../../router/AppRouter';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchUser } from '../../services/session/services';
import { useSelector } from 'react-redux';
import { Preloader } from '../ui/preloader';
import { getIsMounted } from '../../services/session/selectors';

const App = () => {
  const dispatch = useDispatch();
  const isMounted = useSelector(getIsMounted);

  useEffect(() => {
    if (!isMounted) {
      dispatch(fetchUser());
    }
  }, [isMounted, dispatch]);

  if (!isMounted) {
    return <Preloader />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRouter />
    </div>
  );
};

export default App;
