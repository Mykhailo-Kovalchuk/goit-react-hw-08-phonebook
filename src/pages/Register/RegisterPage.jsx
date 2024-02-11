import React from 'react'
import css from './RegisterPage.module.css'

import { useDispatch } from 'react-redux';
import { apiRegisterUser } from '../../redux/auth/authSlice';

const RegisterPage = () => {

  const dispatch = useDispatch();

  const onSubmit = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.userName.value;
    const email = event.currentTarget.elements.userEmail.value;
    const password = event.currentTarget.elements.userPassword.value;
console.log(name, email, password);

    const formData = {
      name,
      email,
      password,
    };

    dispatch(apiRegisterUser(formData));
  };


  return (
    <div className={css.registerContainer}>
    {/* <h1>RegisterPage</h1> */}

    <form onSubmit={onSubmit} className={css.registerForm}>
      <label className={css.registerLabel}>
        Name:
        <input
          type="text"
          name="userName"
          placeholder="Write your name"
          minLength={2}
          required
          className={css.registerInput}
        />
      </label>
      <label className={css.registerLabel}>
        Email:
        <input
          type="email"
          name="userEmail"
          placeholder="your-email@hotmail.ua"
          required
          className={css.registerInput}
        />
      </label>
      <label className={css.registerLabel}>
        Password:
        <input
          type="password"
          name="userPassword"
          placeholder="**********"
          minLength={8}
          required
          className={css.registerInput}
        />
      </label>
      <button type="submit" className={css.registerButton}>Sign Up</button>
    </form>
  </div>
  )
}

export default RegisterPage
