import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ContactsIcon from "@mui/icons-material/Contacts";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <HomeIcon sx={{ width: "20px" }} />
          <Typography component="span">Home</Typography>
        </Box>
      </MenuItem>
      {isLoggedIn && (
        <MenuItem
          onMouseEnter={handleOpenMenu}
          onMouseLeave={() => setTimeout(handleCloseMenu, 300)}
        >
          <Box
            component={NavLink}
            to="/contacts"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&.active": {
                color: { xs: "primary.main", md: "yellow" },
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ContactPhoneIcon sx={{ width: "20px" }} />
            <Typography component="span">Contacts</Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem
              component={NavLink}
              to="/contacts"
              color="primary"
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <ContactsIcon sx={{ width: "16px" }} />
              <Typography variant="span">Show contacts</Typography>
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/add-contact"
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <AddIcCallIcon sx={{ width: "16px" }} />
              <Typography variant="span">Add contact</Typography>
            </MenuItem>
          </Menu>
        </MenuItem>
      )}
    </>
  );
};
