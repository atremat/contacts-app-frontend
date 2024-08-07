import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { LuUserPlus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\+?[ ()0-9-]+$/, "Invalid phone number")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name.trim(),
      phoneNumber: values.number.trim(),
    };

    dispatch(addContact(newContact))
      .unwrap()
      .then(() => toast.success("Contact saved."))
      .catch(() => toast.error("Error occurred when saving contact."));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.form}>
        <div className={css.nameWrapper}>
          <label htmlFor={nameFieldId} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={css.input}
          />
          <ErrorMessage name="name" component="p" className={css.error} />
        </div>

        <div className={css.numberWrapper}>
          <label htmlFor={numberFieldId} className={css.label}>
            Number
          </label>
          <Field
            type="tel"
            name="number"
            id={numberFieldId}
            className={css.input}
          />
          <ErrorMessage name="number" component="p" className={css.error} />
        </div>

        <button type="submit" className={css.btnSubmit}>
          <LuUserPlus className={css.addIcon} />
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
