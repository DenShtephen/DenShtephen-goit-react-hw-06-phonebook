import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectFilters } from '../../redux/selectors';
import { deleteContact } from '../../redux/contactsSlice.js';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleContactDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <ul className="contact-list">
        {filteredContacts.map(contact => (
          <li key={contact.id} className="contact-list-item">
            {contact.name}: {contact.number}
            <button
              type="button"
              className="delete-button"
              onClick={() => handleContactDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
