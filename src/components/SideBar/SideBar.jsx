import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredContacts,
  selectViewMode,
} from "../../redux/filters/selectors";
import { changeViewMode } from "../../redux/filters/slice";

export const SideBar = () => {
  const visibleContacts = useSelector(selectFilteredContacts);
  const viewMode = useSelector(selectViewMode);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeViewMode(e.target.value));
  };

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: { md: "column" },
        gap: { md: 2 },
        padding: 2,
        outline: "1px solid red",
      }}
    >
      <Typography component="p">
        {`Found ${visibleContacts.length} contacts`}
      </Typography>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Show</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={viewMode}
          onChange={handleChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel
            value="favorites"
            control={<Radio />}
            label="Favorites"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
