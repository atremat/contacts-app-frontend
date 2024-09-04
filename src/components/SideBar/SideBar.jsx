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
  selectContactType,
  selectFilteredContacts,
  selectViewMode,
} from "../../redux/filters/selectors";
import { changeContactType, changeViewMode } from "../../redux/filters/slice";
import { useId } from "react";

export const SideBar = () => {
  const visibleContacts = useSelector(selectFilteredContacts);
  const viewMode = useSelector(selectViewMode);
  const contactType = useSelector(selectContactType);

  const dispatch = useDispatch();

  const vievModeId = useId();
  const contactTypeId = useId();

  const handleChangeVievMode = (e) => {
    dispatch(changeViewMode(e.target.value));
  };

  const handleCategoryFilter = (e) => {
    dispatch(changeContactType(e.target.value));
  };

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: { md: "column" },
        gap: { md: 2 },
        padding: 2,
      }}
    >
      <Typography component="p">
        {`Found ${visibleContacts.length} ${
          visibleContacts.length === 1 ? "contact" : "contacts"
        }`}
      </Typography>

      <FormControl>
        <Box sx={{ mb: 2 }}>
          <FormLabel id={vievModeId}>Show</FormLabel>
          <RadioGroup
            aria-labelledby={vievModeId}
            name="viewModeGroup"
            value={viewMode}
            onChange={handleChangeVievMode}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="favorites"
              control={<Radio />}
              label="Favorites"
            />
          </RadioGroup>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormLabel id={contactTypeId}>Group</FormLabel>
          <RadioGroup
            aria-labelledby={contactTypeId}
            name="categoryFilterGroup"
            value={contactType}
            onChange={handleCategoryFilter}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="personal"
              control={<Radio />}
              label="Personal"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
            <FormControlLabel value="home" control={<Radio />} label="Home" />
          </RadioGroup>
        </Box>
      </FormControl>
    </Box>
  );
};
