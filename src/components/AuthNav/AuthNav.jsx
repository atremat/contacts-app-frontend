import { NavLink } from "react-router-dom";
import { Box, MenuItem } from "@mui/material";

export const AuthNav = () => {
  return (
    <>
      <MenuItem>
        <Box
          component={NavLink}
          to="/register"
          sx={{
            textDecoration: "none",
            color: "inherit",
            "&.active": {
              color: { xs: "primary.main", md: "yellow" },
            },
          }}
        >
          Register
        </Box>
      </MenuItem>
      <MenuItem>
        <Box
          component={NavLink}
          to="/login"
          sx={{
            textDecoration: "none",
            color: "inherit",
            "&.active": {
              color: { xs: "primary.main", md: "yellow" },
            },
          }}
        >
          Log In
        </Box>
      </MenuItem>
    </>
  );
};
