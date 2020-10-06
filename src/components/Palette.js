import React, { useState } from "react";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

import { withStyles } from "@material-ui/styles";

import styles from "../styles/PaletteStyles";

function Palette({ classes, palette }) {
  //Aditional destructuring
  const { colors, paletteName, emoji, id } = palette;

  //Initial hook states
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  //Set level on the slider
  const changeLevel = (levelValue) => {
    setLevel(levelValue);
  };

  //Set color value format on dropdown
  const changeFormat = (value) => {
    setFormat(value);
  };

  //Loop throughout colors of selected level and create full grid of them
  const colorBoxes = colors[level].map((color) => (
    <ColorBox
      key={color.id}
      background={color[format]}
      name={color.name}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette
    />
  ));

  return (
    <div className={classes.Palette}>
      {/* Navbar Goes here */}
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
        showingAllColors
      />

      {/* Color box grid */}
      <div className={classes.colors}>{colorBoxes}</div>

      {/* footer goes there */}
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(Palette);
