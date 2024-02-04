import css from './contactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  apiDeleteContact,
  apiGetContacts,
} from '../../redux/contacts/contactsSlice';
import { useEffect } from 'react';
import { STATUSES } from '../../utils/constants';

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const status = useSelector(state => state.contacts.status);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  const handleDelete = contactId => {
    // console.log(contactId)
    dispatch(apiDeleteContact(contactId));
  };

  return (
    <>
      {status === STATUSES.pending && <div>Loading...</div>}
      {status === STATUSES.error && <div>{error}</div>}

      <ul className={css.contactList}>
        {filteredContacts.map(contact => (
          <li key={contact.id} className={css.contactListItem}>
            <p className={css.contactListText}>
              {contact.name}: {contact.phone}
            </p>
            <button
              type="button"
              onClick={() => handleDelete(contact.id)}
              className={css.contactListBtnDelete}
            >
              Delete contact
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export { ContactList };
