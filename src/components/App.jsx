import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setContacts,
  addContact,
  deleteContact,
  setFilter,
} from '../redux/contactsSlice';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

const initializationState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      dispatch(setContacts(initializationState));
    } else {
      dispatch(setContacts(storedContacts));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addUserContact = newContact => {
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (nameExists) {
      alert(`"${newContact.name}" вже є в списку контактів.`);
    } else {
      if (contacts.length === 0) {
        dispatch(setContacts(initializationState));
      }
      dispatch(addContact(newContact));
    }
  };

  const handleFilterChange = evt => {
    dispatch(setFilter(evt.target.value));
  };

  const handleContactDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className="app-container">
      <Section title="PhoneBook">
        <ContactForm onSubmit={addUserContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleContactDelete}
        />
      </Section>
    </div>
  );
};
