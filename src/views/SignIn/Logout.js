import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const LogoutButton = () => {
  const classes = useStyles();
  let history = useHistory();
  function LogoutUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.clear();
    history.push("/");
  }

  return (
    <MenuItem onClick={LogoutUser} className={classes.dropdownItem}>
      Wyloguj
    </MenuItem>
  );
};

export default LogoutButton;
