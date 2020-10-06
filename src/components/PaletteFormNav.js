import React, { useState } from "react";

import PaletteMetaForm from "./PaletteMetaForm";

import { Link } from "react-router-dom";

import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

import styles from "../styles/PaletteFormNavStyles";

function PaletteFormNav({
  open,
  newName,
  handleSubmit,
  handleDrawerOpen,
  handleChange,
}) {
  const classes = styles();

  //Initial state
  const [formShowing, setFormShowing] = useState(false);

  //Open modal
  const showForm = () => {
    setFormShowing(true);
  };

  //Hide modal
  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Button
            variant="contained"
            color="primary"
            onClick={showForm}
            className={classes.button}
          >
            Save
          </Button>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              GO BACK
            </Button>
          </Link>
        </div>
      </AppBar>

      {formShowing && (
        <PaletteMetaForm
          newName={newName}
          hideForm={hideForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}

export default PaletteFormNav;
