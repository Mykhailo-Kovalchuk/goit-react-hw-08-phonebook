// import { Component } from 'react';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { apiAddContact } from '../../redux/contacts/contactsSlice';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts.items);

  const handleFromSubmit = event => {
    event.preventDefault();
    // const form = event.currentTarget;
    // console.log(form.elements);
    // const name = form.elements.name.value;
    // const phone = form.elements.phone.value;
    const id = nanoid(5);
    const formData = { id, name, phone };

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in your contacts`);
      return;
    }

    dispatch(apiAddContact(formData));
    // Очистка форми
    setName('');
    setPhone('');
  };

  return (
    <form className={css.contactForm} onSubmit={handleFromSubmit}>
      <h4 className={css.formTitle}>Name</h4>
      <label className={css.formLabel}>
        <input
          className={css.contactFormInput}
          type="text"
          name="name"
          required
          value={name} // прив'язка до стану name
          onChange={e => setName(e.target.value)} //  обробник onChange
          placeholder="Write a name"
        />
      </label>

      <h4 className={css.formTitle}>Number</h4>
      <label className={css.formLabel}>
        <input
          className={css.contactFormInput}
          type="tel"
          name="number"
          required
          value={phone} //  прив'язка до стану number/phone
          onChange={e => setPhone(e.target.value)} // Додано обробник onChange
          placeholder="Write a number"
          // pattern="\d{3}-\d{2}-\d{2}"
          title="xxx-xx-xx"
        />
      </label>
      <button type="submit" className={css.formButton}>
        Add to contacts
      </button>
    </form>
  );
};

export { ContactForm };
