import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import { MenuItem, Typography } from "@mui/material";

export const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <MenuItem onClick={() => dispatch(logOut())}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
};
