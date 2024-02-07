import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { selectAuthIsLoggedIn } from '../../redux/auth/authSliceSelectors'

const PrivateRoute = ({ children, redirectTo = '/' }) => {

const isLoggedIn = useSelector(selectAuthIsLoggedIn);


  return isLoggedIn ? children :  <Navigate to={redirectTo} replace />;
};
// передали адресу переадресації через пропс, а далі вже передали його до Навігейту
// replace це спецвластивість, яка не дозволяє кнопкою Назад повернутись на попередню сторінку (при логінах і авторизації мастхев)
export default PrivateRoute;