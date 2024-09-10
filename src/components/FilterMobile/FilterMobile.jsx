import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  selectViewMode,
} from "../../redux/filters/selectors";
import { useId } from "react";
import { changeContactType, changeViewMode } from "../../redux/filters/slice";

export const FilterMobile = () => {
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
      component="section"
      sx={{
        display: { xs: "flex", md: "none" },
        justifyContent: "center",
        mb: 2,
      }}
    >
      <Accordion sx={{ width: { xs: 288, sm: 343 } }}>
        <AccordionSummary>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FilterAltIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              Filters
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
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
                <FormControlLabel
                  value="work"
                  control={<Radio />}
                  label="Work"
                />
                <FormControlLabel
                  value="home"
                  control={<Radio />}
                  label="Home"
                />
              </RadioGroup>
            </Box>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
