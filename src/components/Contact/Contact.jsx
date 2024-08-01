import css from './Contact.module.css';

export default function Contact({ data: { name, number }, onDelete }) {
  return (
    <div className={css.card}>
      <p className={css.name}>{name}</p>
      <p className={css.number}>{number}</p>
      <button onClick={onDelete} className={css.btn}>
        Delete
      </button>
    </div>
  );
}
