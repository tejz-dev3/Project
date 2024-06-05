import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Button className="title" color="inherit" component={Link} to="/">
          User Management System
        </Button>
        <Button color="inherit" component={Link} to="/view-users">
          View Users
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
