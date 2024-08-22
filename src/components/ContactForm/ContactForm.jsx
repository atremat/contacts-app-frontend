import { Formik, Form, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { LuUserPlus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import { Box, Button, TextField } from "@mui/material";

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
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <Box
            sx={{
              width: 320,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <TextField
                type="text"
                name="name"
                id={nameFieldId}
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="name" component="span" />}
                // error={!!(<ErrorMessage name="name" />)}
              />
            </Box>

            <Box>
              <TextField
                type="tel"
                name="number"
                id={numberFieldId}
                label="Number"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                variant="outlined"
                helperText={<ErrorMessage name="number" component="span" />}
                // error={!!(<ErrorMessage name="number" />)}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<LuUserPlus />}
            >
              {/* <LuUserPlus className={css.addIcon} /> */}
              Add contact
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
