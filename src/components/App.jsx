// Компонент App на redux - дуже мало коду, логіка виконується в компонентах, де через useSelector та useDispatch
// безпосередньо зі стору беруться всі дані які необхідні і вносяться зміни.
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
// import { fetchContacts } from '../services/api';

export const App = () => {
  // fetchContacts();

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
  );
};

//////////////////////////// компонент App виглядатиме так якщов ньому будуть використовуватись пропси, стани, навіть хуки... багато....

// // import { useState, useEffect } from 'react';

// import { ContactForm } from './ContactForm/ContactForm';
// import { Filter } from './Filter/Filter';
// import { ContactList } from './ContactList/ContactList';

// // import { useSelector, useDispatch } from 'react-redux';   // вся логіка з селектором, діспатчем виконується безпосередньо в компонентах
// //   // addContact, --- Логіка перейшла в компонент ContactList
// //   // removeContact, --- Логіка перейшла в компонент ContactList
// //   // setFilter,
// // } from '../redux/contacts/contactsSlice';

// export const App = () => {
//   // state = {
//   //   contacts: [],
//   //   filter: '',
//   // };

//   // const dispatch = useDispatch();
//   // const contacts = useSelector(state => state.contacts.contacts);
//   // const filter = useSelector(state => state.contacts.filter);

//   ////// Хук створення стану - useState
//   // const [contacts, setContacts] = useState([]);
//   // const [filter, setFilter] = useState('');

//   //////////////// Робота з локальним сховищем ( ДЛЯ ТРЕТЬОГО ДЗ)

//   // Функція перевірки локального сховища
//   // const localStorageCheck = () => {
//   //   const savedContacts = localStorage.getItem('contacts');
//   //   // console.log(savedContacts)
//   //   return JSON.parse(savedContacts) || null;
//   // }

//   // Функція додавання до локального сховища контакт (оновлення)
//   // const localStorageAdd = contactsArray => {
//   //   // const newContactsList = [...contactsArray, newContact]
//   //   localStorage.setItem('contacts', JSON.stringify(contactsArray));
//   // };

//   /////////////////// ЖИТТЄВИЙ ЦИКЛ ///////////////////
//   // Типу DidMount (одноразка)
//   // useEffect(() => {
//   //   const savedLSContacts = localStorageCheck();

//   //   if (savedLSContacts === null) {
//   //     return
//   //   } else {
//   //        setContacts(savedLSContacts);
//   //   }

//   // }, [])

//   // Типу DidUpdate
//   // useEffect(() => {
//   //       localStorageAdd(contacts);

//   //   if (contacts.length < 1){
//   //     localStorage.removeItem('contacts')
//   //   }

//   // }, [contacts])

//   //Функція для отрмання даних при додаванні нового контакту (ф-цію передаємо як пропс в ContactForm, a з потім з пропсу в локальному компоненті через колбек витягуємо дані назад )
//   // const handlerAddContact = formData => {
//   //   // console.log(formData);
//   //   if (
//   //     contacts.some(
//   //       contact =>
//   //         contact.name.trim().toLowerCase() ===
//   //         formData.name.trim().toLowerCase()
//   //     )
//   //   ) {
//   //     alert(`${formData.name} is already in your contacts`);
//   //   } else {
//   //     // setContacts([...contacts, formData]
//   //     // );
//   //     const action = addContact(formData);
//   //     dispatch(action);
//   //   }
//   // };

//   // Функція фільтрації
//   // const handlerChangeFilter = filterValue => {
//   //   // setFilter(filterValue);
//   //   const action = setFilter(filterValue);
//   //   dispatch(action);
//   // };

//   //Функція видалення кнопки   --- Логіка перейшла в компонент ContactList
//   // const contactBtnDeleter = id => {
//   //   // setContacts(contacts.filter(contact => contact.id !== id));
//   //   const action = removeContact(id);
//   //   dispatch(action);
//   // };

//   // Фільтрація
//   // const filteredContact = contacts.filter(contact =>
//   //   contact.name.trim().toLowerCase().includes(filter)
//   // );

//   return (
//     <div
//       style={{
//         // height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       <h1>Phonebook</h1>
//       <ContactForm />
//       <h2>Contacts</h2>
//       <Filter   />
//       <ContactList />
//     </div>
//   );
// };
