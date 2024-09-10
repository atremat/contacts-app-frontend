import { Select, MenuItem, InputLabel, FormControl, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSortBy, selectSortOrder } from "../../redux/contacts/selectors";
import { setSortBy, setSortOrder } from "../../redux/contacts/slice";

export default function SortSelect() {
  const dispatch = useDispatch();
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  const handleSortByChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleSortOrderChange = (event) => {
    dispatch(setSortOrder(event.target.value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        width: { xs: 288, sm: 343 },
        padding: "16px",
      }}
    >
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by"
          value={sortBy}
          label="Sort By"
          onChange={handleSortByChange}
        >
          <MenuItem value="_id">ID</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="phoneNumber">Phone Number</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="sort-order-label">Order</InputLabel>
        <Select
          labelId="sort-order-label"
          id="sort-order"
          value={sortOrder}
          label="Order"
          onChange={handleSortOrderChange}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
