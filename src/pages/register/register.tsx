import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { signUp } from '../../services/session/services';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../services/session/selectors';
import { useForm } from '../../utils/hooks/useForm';

export const Register: FC = () => {
  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
    userName: ''
  });

  const { email, password, userName } = values;

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
      signUp({
        email: email,
        name: userName,
        password: password
      })
    );
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={handleChange}
      setPassword={handleChange}
      setUserName={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
