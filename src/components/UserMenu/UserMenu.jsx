import React from 'react';
import css from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogoutUser } from '../../redux/auth/authSlice';
import {
  selectAuthIsLoading,
  selectAuthUserData,
} from '../../redux/auth/authSliceSelectors';

const UserMenu = () => {
  // створюємо діспатч (транмпорт)
  const dispatch = useDispatch();

  // Витягуємо тепер селектори і підставляємо значення в розмітку
  const userData = useSelector(selectAuthUserData);
  const isLoading = useSelector(selectAuthIsLoading); // це для того, щоб коли користувач натисне на кнопку раз, то
  // щоб кнопка була неактивною. Передамо цю умову в кнопку у властивість disabled

  const userEmail = userData?.email ?? 'Email has not found';

  // передаємо нашу функцію запиту на логаут
  const handleLogout = () => 
    
    dispatch(apiLogoutUser());
   
  return (
    <div className={css.logout}>
      <p className={css.userMail}>{userEmail}</p>
      <button
        type="button"
        onClick={handleLogout}
        className={css.logoutButton}
        disabled={isLoading}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
