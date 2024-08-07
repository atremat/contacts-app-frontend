import { useId } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import css from "./RegistrationForm.module.css";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const signSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(16, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const registerInfo = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };

    dispatch(register(registerInfo))
      .unwrap()
      .then(() => toast.success("Registration success!"))
      .catch(() => toast.error("User with this login already exists !"));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signSchema}
    >
      <Form className={css.form}>
        <label htmlFor={nameFieldId}>Username</label>
        <Field type="text" name="name" id={nameFieldId} />
        <ErrorMessage name="name" component="p" className={css.error} />

        <label htmlFor={emailFieldId}>Email</label>
        <Field type="email" name="email" id={emailFieldId} />
        <ErrorMessage name="email" component="p" className={css.error} />

        <label htmlFor={passwordFieldId}>Password</label>
        <Field type="password" name="password" id={passwordFieldId} />
        <ErrorMessage name="password" component="p" className={css.error} />

        <button type="submit">Sign up</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
