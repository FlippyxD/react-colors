import React, { useState } from "react";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/styles";

import styles from "../styles/PaletteStyles";

function SingleColorPalette({ palette, colorId, classes }) {
  //Aditional destructuring
  const { paletteName, emoji, id } = palette;

  //Initial hook states
  const [format, setFormat] = useState("hex");

  //Generate shade of color for each level
  const gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }

    //return all except white values
    return shades.slice(1);
  };

  const changeFormat = (value) => {
    setFormat(value);
  };

  //Variable to store shades of color
  const shadesToMap = gatherShades(palette, colorId);

  //Loop to create single color palette based on levels
  const colorBoxes = shadesToMap.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} showingAllColors={false} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);
