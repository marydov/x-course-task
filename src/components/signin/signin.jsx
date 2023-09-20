import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../context/use-user';
import './signin.scss';
import avatar from '../../images/avatar.png';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Signin() {
  const { setUserName } = useContext(User);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const person = JSON.parse(user);

    if (user) {
      setUserName(person.name);
    } else {
      navigate('/');
    }
  }, [navigate, setUserName]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    localStorage.setItem('user', JSON.stringify({ name: values.name }));
    const lsData = localStorage.getItem('user');
    const person = JSON.parse(lsData);
    setUserName(person.name);
    navigate('/books');
    resetForm(); //скинути форму
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Must be at least 4 characters!')
      .max(16, 'Must be 16 characters or less!')
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'Only letters, numbers and underscores are allowed'
      ) //^ початок рядка $ кінець рядка [a-zA-Z0-9] регулярний вираз(всі букви, всі цифри)
      .required('Required'),
  });

  return (
    <>
      <div className="signin__container">
        <img src={avatar} alt="User avatar" className="avatar__img" />
        <h4>Username</h4>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(
            { isSubmitting } //isSubmitting - стан подання форми, true (надсилання триває), false (форма відправлена)
          ) => (
            <div>
              <Form className="user__form">
                <div>
                  <Field
                    name="name"
                    className="name"
                    placeholder="type Username"
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => (
                      <p className="error__message-form">{msg}</p>
                    )}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit"
                >
                  Sign-in
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}
