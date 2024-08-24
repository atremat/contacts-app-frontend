import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Box, MenuItem } from "@mui/material";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <MenuItem>
        <Box
          component={NavLink}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            "&.active": {
              color: { xs: "primary.main", md: "yellow" },
            },
          }}
        >
          Home
        </Box>
      </MenuItem>
      {isLoggedIn && (
        <MenuItem>
          <Box
            component={NavLink}
            to="/contacts"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&.active": {
                color: { xs: "primary.main", md: "yellow" },
              },
            }}
          >
            Contacts
          </Box>
        </MenuItem>
      )}
    </>
  );
};
