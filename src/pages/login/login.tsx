import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { signIn } from '../../services/session/services';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../services/session/selectors';
import { useForm } from '../../utils/hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  const { email, password } = values;

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
      setEmail={handleChange}
      password={password}
      setPassword={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
