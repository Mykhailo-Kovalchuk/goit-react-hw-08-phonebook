// import { apiRegisterUser } from '../redux/auth/authSlice';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { Filter } from '../../components/Filter/Filter';
import { ContactList } from '../../components/ContactList/ContactList';
import css from './ContactsPage.module.css'

const ContactsPage = () => {
  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <p className={css.text}>Add new contact to your phonebook</p>
      <ContactForm />
      <p className={css.text}>Your contacts</p>
      <Filter />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
