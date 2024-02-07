import React from 'react'
import css from './UserMenu.module.css'

 const UserMenu = () => {
  return (
    <div className={css.logout}>
    <p className={css.userMail}>mango@mail.com</p>
    <button className={css.logoutButton}>Logout</button>
  </div>
  )
}

export default UserMenu;