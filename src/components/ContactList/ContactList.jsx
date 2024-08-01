import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsOps';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDelete = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={css.list}>
      {contacts.map((contact) => (
        <li key={contact.id} className={css.item}>
          <Contact data={contact} onDelete={() => handleDelete(contact.id)} />
        </li>
      ))}
    </ul>
  );
}
