import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, getContacts, getFilter } from '../../redux/slice';
import css from './ContactItem.module.css';

export const ContactItem = () => {
  const contact = useSelector(getContacts);
  const filterContact = useSelector(getFilter);
  console.log(contact);

  const dispatch = useDispatch();

  const getVisibleContact = () => {
    const normalizedContact = filterContact.toLowerCase();
    return contact.filter(({ name }) =>
      name.toLowerCase().includes(normalizedContact)
    );
  };

  const visibleContact = getVisibleContact();

  const handleDelete = evt => {
    const id = evt.currentTarget.name;
    dispatch(deleteContact(id));
  };

  return (
    <>
      {!visibleContact.length ? (
        <p>
          <b>No contacts</b>
        </p>
      ) : (
        visibleContact.map(item => {
          return (
            <li key={item.id}>
              <span className={css.user}>{item.name}:</span>
              <span className={css.contact}>{item.number}</span>
              <button
                className={css.btn}
                type="button"
                name={item.id}
                onClick={handleDelete}
              >
                Delete
              </button>
            </li>
          );
        })
      )}
    </>
  );
};
