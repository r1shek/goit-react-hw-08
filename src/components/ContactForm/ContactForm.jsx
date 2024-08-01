import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsOps';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    number: '',
  };

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .matches(/^[0-9\-\+]{3,50}$/, 'Invalid phone number')
      .required('Required'),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <div className={css.field}>
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage
            name="name"
            component="div"
            className={css.errorMessage}
          />
        </div>

        <div className={css.field}>
          <label htmlFor="number">Number</label>
          <Field type="tel" name="number" id="number" />
          <ErrorMessage
            name="number"
            component="div"
            className={css.errorMessage}
          />
        </div>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
