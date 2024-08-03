import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operation';
//import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        if (/^\d*$/.test(value)) {
          setNumber(value);
        }
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Number
        <input
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
