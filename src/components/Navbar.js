import React, { useState } from "react";
import { Link } from "react-router-dom";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/styles";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import styles from "../styles/NavbarStyles";

function Navbar({
  level,
  changeLevel,
  showingAllColors,
  classes,
  handleChange,
}) {
  //Initial hook states
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  //Sets hook states after selecting option in dropdown
  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    setOpen(true);

    //Calls function in parent to change dropdown value
    handleChange(e.target.value);
  };

  //Hide Snack Bar
  const closeSnackBar = () => {
    setOpen(false);
  };

  return (
    <div>
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>

        {showingAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}

        <div className={classes.selectContainer}>
          <Select value={format} onChange={handleFormatChange}>
            <MenuItem value="hex">HEX = #ffffff</MenuItem>
            <MenuItem value="rgb">RGB = rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGB = rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed to {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={closeSnackBar}
          action={[
            <IconButton
              onClick={closeSnackBar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    </div>
  );
}

export default withStyles(styles)(Navbar);
