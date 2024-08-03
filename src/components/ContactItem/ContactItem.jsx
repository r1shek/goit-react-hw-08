import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className={css.item}>
      <p>
        {name}: {number}
      </p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ContactItem;
