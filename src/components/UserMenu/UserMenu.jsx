import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { MenuItem, Typography } from "@mui/material";

export const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <MenuItem onClick={() => dispatch(logOut())}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
};
