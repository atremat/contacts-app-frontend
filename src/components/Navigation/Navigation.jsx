import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { MenuItem } from "@mui/material";

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <>
      <MenuItem>
        <NavLink
          to="/"
          className={buildLinkClass}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Home
        </NavLink>
      </MenuItem>
      {isLoggedIn && (
        <MenuItem>
          <NavLink
            to="/contacts"
            className={buildLinkClass}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Contacts
          </NavLink>
        </MenuItem>
      )}
    </>
  );
};
