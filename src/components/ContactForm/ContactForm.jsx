import { Formik, Form } from "formik";
import { useId, useState } from "react";
import * as Yup from "yup";
import { LuUserPlus } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ErrorTip from "../ErrorTip/ErrorTip";
import { useNavigate } from "react-router-dom";
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

const initialValues = {
  name: "",
  phoneNumber: "",
  contactType: "personal",
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

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();
  const selectId = useId();
  const navigate = useNavigate();

  const [, setAvatarUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (values, actions) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (selectedFile) {
      formData.append("photo", selectedFile); // Додавання файлу до formData
    }

    dispatch(addContact(formData))
      .unwrap()
      .then(() => toast.success("Contact saved."))
      .catch(() => toast.error("Error occurred when saving contact."));

    actions.resetForm();
    navigate("/contacts");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
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
            <Box
              sx={{
                width: { xs: 288, sm: 343, md: 514 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "0 auto",
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
                  helperText={<ErrorTip name="name" />}
                />
              </Box>

              <Box>
                <TextField
                  type="tel"
                  name="phoneNumber"
                  id={numberFieldId}
                  label="Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  variant="outlined"
                  helperText={<ErrorTip name="phoneNumber" />}
                />
              </Box>

              <Box>
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

              <Box>
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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<LuUserPlus />}
              >
                Add contact
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
