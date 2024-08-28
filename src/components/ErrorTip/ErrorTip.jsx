import { Typography } from "@mui/material";
import { ErrorMessage } from "formik";

const ErrorTip = ({ name }) => {
  return (
    <Typography variant="span" sx={{ color: "red" }}>
      <ErrorMessage name={name} component="span" />
    </Typography>
  );
};

export default ErrorTip;
