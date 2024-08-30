import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contacts/operations";

const ContactType = ({ contactType, _id }) => {
  const dispatch = useDispatch();
  const selectId = useId();

  const handleChange = (event) => {
    dispatch(editContact({ _id: _id, contactType: event.target.value }));
  };

  return (
    <FormControl sx={{ width: "200px" }}>
      <InputLabel id={selectId}>Group</InputLabel>
      <Select
        labelId={selectId}
        id="contactType"
        value={contactType}
        label="Contact type"
        onChange={handleChange}
      >
        <MenuItem value="personal">Personal</MenuItem>
        <MenuItem value="work">Work</MenuItem>
        <MenuItem value="home">Home</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ContactType;
