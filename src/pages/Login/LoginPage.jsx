import React from 'react';
import css from './LoginPage.module.css'

import { useDispatch } from 'react-redux';
import { apiLoginUser } from '../../redux/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    const email = event.currentTarget.elements.userEmail.value;
    const password = event.currentTarget.elements.userPassword.value;

    const formData = {
      email,
      password,
    };

    console.log(formData);

    dispatch(apiLoginUser(formData));
  };

  return (
    <div className={css.loginContainer}>
      {/* <h1 className={css.loginText}>LoginPage</h1> */}

      <form onSubmit={onSubmit} className={css.loginForm}>
        <label className={css.loginLabel}>
          Email:
          <input
            type="email"
            name="userEmail"
            placeholder="your-email@hotmail.ua"
            required
            className={css.loginInput}
          />
        </label>
        <label className={css.loginLabel}>
          Password:
          <input
            type="password"
            name="userPassword"
            placeholder="**********"
            minLength={8}
            required
            className={css.loginInput}
          />
        </label>
        <button type="submit"  className={css.loginButton}>Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
