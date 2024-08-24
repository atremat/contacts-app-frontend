import { useId } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import css from "./RegistrationForm.module.css";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

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
      {({ handleChange, handleBlur, values }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mb: 2, width: 280 }}>
              <TextField
                type="text"
                name="name"
                id={nameFieldId}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ marginRight: "10px" }} />
                    <Typography component="span">Name</Typography>
                  </Box>
                }
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  <ErrorMessage
                    name="name"
                    component="p"
                    className={css.error}
                  />
                }
                sx={{ mt: 1 }}
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 2, width: 280 }}>
              <TextField
                type="email"
                name="email"
                id={emailFieldId}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EmailIcon sx={{ marginRight: "10px" }} />
                    <Typography component="span">Email</Typography>
                  </Box>
                }
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  <ErrorMessage
                    name="email"
                    component="p"
                    className={css.error}
                  />
                }
                sx={{ mt: 1 }}
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 2, width: 280 }}>
              <TextField
                type="password"
                name="password"
                id={passwordFieldId}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <KeyIcon sx={{ marginRight: "10px" }} />
                    <Typography component="span">Password</Typography>
                  </Box>
                }
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  <ErrorMessage
                    name="password"
                    component="p"
                    className={css.error}
                  />
                }
                fullWidth
                sx={{ mt: 1 }}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
