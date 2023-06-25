import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContacts } from '../../redux/slice';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const userContacts = useSelector(getContacts);

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setUserName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const reset = () => {
    setUserName('');
    setNumber('');
  };

  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    if (userContacts.some(({ name }) => name === userName)) {
      toast.warn(`${userName} is already contacts`, { theme: 'colored' });
      return;
    }
    const id = nanoid();
    dispatch(addContact({ id, name: userName, number }));
    reset();
  };

  return (
    <form className={css.formContact} onSubmit={handleSubmit}>
      <label>
        <p className={css.text}>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoFocus
          autoComplete="off"
          onChange={handleChange}
          value={userName}
        />
      </label>
      <label>
        <p>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
          onChange={handleChange}
          value={number}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};
