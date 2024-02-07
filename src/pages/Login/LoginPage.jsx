import React from 'react'

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
    <div>
      <h1>LoginPage</h1>

      <form onSubmit={onSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default LoginPage