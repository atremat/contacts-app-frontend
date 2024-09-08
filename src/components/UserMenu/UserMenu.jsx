import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { MenuItem, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <MenuItem onClick={() => dispatch(logOut())}>
      <LogoutIcon sx={{ width: "20px" }} />
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
};
