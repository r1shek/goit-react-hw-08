import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import { useState } from 'react';
import css from './LoginForm.module.css';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(logIn(values))
      .unwrap()
      .catch((error) => {
        setErrorMessage(error);
      });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.input} />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>
          <button type="submit" disabled={isSubmitting} className={css.button}>
            Log In
          </button>
          {errorMessage && <div className={css.error}>{errorMessage}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
