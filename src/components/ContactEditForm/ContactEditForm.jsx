import { Formik, Form } from "formik";
import { useId, useState } from "react";
import * as Yup from "yup";
import { LiaSave } from "react-icons/lia";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectContactForEdit } from "../../redux/contacts/selectors";
import { setContactForEdit } from "../../redux/contacts/slice";
import { editContact } from "../../redux/contacts/operations";
import {
  Box,
  Button,
  Card,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ErrorTip from "../ErrorTip/ErrorTip";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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
  const selectId = useId();
  const [selectedFile, setSelectedFile] = useState(null);

  const contactToEdit = useSelector(selectContactForEdit);
  const dispatch = useDispatch();

  const initialValues = {
    name: contactToEdit.name,
    phoneNumber: contactToEdit.phoneNumber,
    contactType: contactToEdit.contactType,
  };

  const handleSubmit = (values, actions) => {
    const formData = new FormData();
    formData.append("_id", contactToEdit._id);

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    dispatch(editContact(formData));
    dispatch(setContactForEdit(null));
    actions.resetForm();
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
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
                width: { xs: 288, sm: 343, md: 514 },
                margin: "16px auto",
                marginTop: 2,
                padding: "15px 5px 5px",
              }}
            >
              <Box sx={{ mb: 4 }}>
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
                  helperText={<ErrorTip name="name" />}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
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
                  helperText={<ErrorTip name="phoneNumber" />}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <InputLabel id={selectId}>Group</InputLabel>
                <Select
                  labelId={selectId}
                  id="contactType"
                  name="contactType"
                  label="Contact type"
                  value={values.contactType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ width: "200px" }}
                >
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                </Select>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handlePhotoChange}
                  />
                </Button>
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
