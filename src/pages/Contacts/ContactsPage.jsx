import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
// import { apiRegisterUser } from '../redux/auth/authSlice';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { Filter } from '../../components/Filter/Filter';
import { ContactList } from '../../components/ContactList/ContactList';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectContacts, selectContactsError, selectContactsIsLoading } from '../../redux/contacts/contactsSlice.selectors';
import { apiGetContacts } from '../../redux/contacts/contactsSlice';


const ContactsPage = () => {
const dispatch = useDispatch();

// const contacts = useSelector(selectContacts);
// const isLoading = useSelector(selectContactsIsLoading);
// const error = useSelector(selectContactsError);

// console.log(`contacts: ${contacts}, loading: ${isLoading}, error: ${error}`);

useEffect(() => {
  dispatch(apiGetContacts())
}, [dispatch])

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
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  )
}

export default ContactsPage