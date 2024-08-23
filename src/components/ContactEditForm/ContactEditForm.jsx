import { Formik, Form, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { LiaSave } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectContactForEdit } from "../../redux/contacts/selectors";
import { setContactForEdit } from "../../redux/contacts/slice";
import { editContact } from "../../redux/contacts/operations";
import { Box, Button, Card, TextField, Typography } from "@mui/material";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[ ()0-9-]+$/, "Invalid phone number")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const ContactEditForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const contactToEdit = useSelector(selectContactForEdit);
  const dispatch = useDispatch();

  const initialValues = {
    name: contactToEdit.name,
    phoneNumber: contactToEdit.phoneNumber,
  };

  const handleSubmit = (values, actions) => {
    const editedContact = {
      _id: contactToEdit._id,
      name: values.name.trim(),
      phoneNumber: values.phoneNumber.trim(),
    };

    dispatch(editContact(editedContact));
    dispatch(setContactForEdit(null));
    actions.resetForm();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Card
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
                width: 288,
                marginTop: "20px",
                padding: "15px 5px 5px",
              }}
            >
              <Box sx={{ marginBottom: 4 }}>
                {/* <InputLabel htmlFor={nameFieldId}>Name</InputLabel> */}
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
                  helperText={<ErrorMessage name="name" component="p" />}
                />
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                {/* <label htmlFor={numberFieldId}>Number</label> */}
                <TextField
                  type="tel"
                  name="phoneNumber"
                  id={numberFieldId}
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorMessage name="phoneNumber" component="p" />}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  onClick={() => dispatch(setContactForEdit(null))}
                  color="error"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <MdOutlineCancel />
                  <Typography variant="span" sx={{ marginLeft: "5px" }}>
                    Cancel
                  </Typography>
                </Button>

                <Button
                  type="submit"
                  color="success"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LiaSave />
                  <Typography variant="span" sx={{ marginLeft: "5px" }}>
                    Save contact
                  </Typography>
                </Button>
              </Box>
            </Card>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactEditForm;
