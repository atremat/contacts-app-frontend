import { useId } from "react";
import { changeFilter } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/filters/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors";
import { Card, Input, InputLabel, Typography } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const SearchBox = () => {
  const searchValueId = useId();
  const dispatch = useDispatch();

  const value = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    contacts.length > 0 && (
      <Card
        sx={{
          width: 288,
          padding: "10px 16px",
          marginBottom: 2,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <InputLabel
          htmlFor="component-simple"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <PersonSearchIcon sx={{ marginRight: "10px" }} />
          <Typography component="span" fontSize="0.9rem">
            Find contacts by name or number
          </Typography>
        </InputLabel>
        <Input
          id={searchValueId}
          value={value}
          onChange={handleChange}
          label="contact name"
          variant="filled"
          sx={{ width: "100%" }}
        />
      </Card>
    )
  );
};

export default SearchBox;
