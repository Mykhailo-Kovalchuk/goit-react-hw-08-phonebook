import React from 'react'

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
    <div>
    <h1>RegisterPage</h1>

    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="userName"
          placeholder="Write your name"
          minLength={2}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="userEmail"
          placeholder="your-email@hotmail.ua"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="userPassword"
          placeholder="**********"
          minLength={8}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  </div>
  )
}

export default RegisterPage
