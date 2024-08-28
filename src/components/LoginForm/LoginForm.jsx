import { useId } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import ErrorTip from "../ErrorTip/ErrorTip";

const LoginForm = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const signSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email!").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(16, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const loginInfo = {
      email: values.email.trim(),
      password: values.password.trim(),
    };

    dispatch(login(loginInfo))
      .unwrap()
      .then(() => {
        toast.success("Login success!");
      })
      .catch(() => {
        toast.error("User with this login and password does not exist!");
      });

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
            <Box sx={{ mb: 2, width: { xs: 288, sm: 343, md: 514 } }}>
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
                helperText={<ErrorTip name="email" />}
                sx={{ mt: 1 }}
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 2, width: { xs: 288, sm: 343, md: 514 } }}>
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
                helperText={<ErrorTip name="password" />}
                fullWidth
                sx={{ mt: 1 }}
              />
            </Box>

            <Button type="submit" variant="contained" color="primary">
              Log in
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
