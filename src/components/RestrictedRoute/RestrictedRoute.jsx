import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { selectAuthIsLoggedIn } from '../../redux/auth/authSliceSelectors'

const RestrictedRoute = ({ children }) => {

const isLoggedIn = useSelector(selectAuthIsLoggedIn);


  return isLoggedIn ? <Navigate to='/contacts' replace /> : children;
};
// replace це спецвластивість, яка не дозволяє кнопкою Назад повернутись на попередню сторінку (при логінах і авторизації мастхев)
export default RestrictedRoute