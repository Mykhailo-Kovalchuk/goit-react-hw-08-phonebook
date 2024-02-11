import css from './contactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  apiDeleteContact,
  apiGetContacts,
} from '../../redux/contacts/contactsSlice';
import { useEffect } from 'react';
import { STATUSES } from '../../utils/constants';
import {
  selectContacts,
  selectContactsError,
  selectContactsIsLoading,
  selectContatctsFilter,
} from '../../redux/contacts/contactsSlice.selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  // дістаємо наші дані зі стану
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectContatctsFilter);

  // const contacts = useSelector(state => state.contacts.contacts);
  // const filter = useSelector(state => state.contacts.filter);

  // const status = useSelector(state => state.contacts.status);
  // const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    const normalizedFilter = filter?.toLowerCase(); ///////////////////?
    // console.log(normalizedFilter)
    // console.log(contacts);
    return contacts?.filter(
      (
        contact /////////////////////////  ?
      ) => contact.name && contact.name.toLowerCase().includes(normalizedFilter)

      // contact.name
    );
  };

  const filteredContacts = getFilteredContacts();
  // console.log(filteredContacts)

  const handleDelete = contactId => {
    // console.log(contactId)
    dispatch(apiDeleteContact(contactId));
    ///////////// поставити нотіфікашту про успішне видалення контакту
  };

  return (
    <>
      {isLoading === STATUSES.pending && <div>Loading...</div>}
      {isLoading === STATUSES.error && <div>{error}</div>}

      <ul className={css.contactList}>
        {filteredContacts.map(
          (
            contact ////////////////////////?
          ) => (
            <li key={contact.id} className={css.contactListItem}>
              <p className={css.contactListText}>
                {contact.name}: {contact.number}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(contact.id)}
                className={css.contactListBtnDelete}
              >
                Delete contact
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export { ContactList };
