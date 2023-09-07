import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import '../../index.css';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = evt => {
    evt.preventDefault();

    const id = nanoid();
    const newContact = { id, name, number };

    addUserContact(newContact);

    setName('');
    setNumber('');
  };

  const handleInputChange = evt => {
    const inputName = evt.target.name;

    switch (inputName) {
      case 'name':
        setName(evt.target.value);
        break;
      case 'number':
        setNumber(evt.target.value);
        break;
      default:
        break;
    }
  };

  const addUserContact = newContact => {
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (nameExists) {
      alert(`"${newContact.name}" вже є в списку контактів.`);
    } else {
      dispatch(addContact(newContact));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        placeholder="Joe Biden"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces..."
        required
      />
      <input
        type="text"
        name="number"
        value={number}
        onChange={handleInputChange}
        placeholder="696-96-96"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}..."
        title="Phone number must be digits and can contain spaces, dashes..."
        required
      />
      <button type="submit" className="submit-button">
        Add Contact
      </button>
    </form>
  );
};
