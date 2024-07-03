import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { StateSchema, useDispatch, useSelector } from '../../services/store';
import { signIn } from '../../services/session/services';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../services/session/selectors';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getIsAuth);
  const location = useLocation();

  useEffect(() => {
    const from = location.state?.from;

    if (isAuth) {
      navigate(from || '/');
    }
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      signIn({
        email,
        password
      })
    );
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
