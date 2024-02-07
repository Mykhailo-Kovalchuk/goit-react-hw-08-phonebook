// Компонент App на redux - дуже мало коду, логіка виконується в компонентах, де через useSelector та useDispatch
// безпосередньо зі стору беруться всі дані які необхідні і вносяться зміни.

import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, Navigate, NavLink } from 'react-router-dom';
// import { fetchContacts } from '../services/api';
import css from './app.module.css';
import { Loader } from './Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../redux/auth/authSliceSelectors';
import { apiRefreshUser } from '../redux/auth/authSlice';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute'
import PrivateRoute from './PrivateRoute/PrivateRoute'

export const App = () => {
  // fetchContacts();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const HomePage = lazy(() => import('../pages/Home/HomePage'));
  const RegisterPage = lazy(() => import('../pages/Register/RegisterPage'));
  const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
  const ContactsPage = lazy(() => import('../pages/Contacts/ContactsPage'));
  const UserMenu = lazy(() => import('../components/UserMenu/UserMenu'));

  // Під час першого рендеру  надсилаємо запит в стан і дивимось чи є там токен, якщо так, тоді підтягуємо його і додаємо в хедерси, щоб користувач був залогований. 
const dispatch = useDispatch();
useEffect(() => {dispatch(apiRefreshUser)}, [dispatch])



  return (
    <div className={css.appContainer}>
      <header className={css.header}>
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.active : ''}`
            }
          >
            Home
          </NavLink>

          {!isLoggedIn && (
            <>
              {' '}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.active : ''}`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.active : ''}`
                }
              >
                Login
              </NavLink>{' '}
            </>
          )}

          {isLoggedIn && (
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                `${css.navLink} ${isActive ? css.active : ''}`
              }
            >
              {' '}
              Contacts{' '}
            </NavLink>
          )}
        </div>
        {isLoggedIn && (
          <Suspense fallback={<Loader />}>
            <UserMenu />
          </Suspense>
        )}
      </header>

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register/*" element={<RestrictedRoute><RegisterPage /></RestrictedRoute>} />
          <Route path="/login/*" element={<RestrictedRoute><LoginPage /></RestrictedRoute>} />
          <Route path="/contacts/*" element={<PrivateRoute> <ContactsPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};
