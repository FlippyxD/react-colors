import React from "react";

import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "../styles/MiniPaletteStyles";

function MiniPalette({
  id,
  classes,
  paletteName,
  emoji,
  colors,
  openDialog,
  handleClick,
}) {
  //Delete Palette
  const deletePalette = (e) => {
    e.stopPropagation();
    openDialog(id);
  };

  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  return (
    <div className={classes.root} onClick={() => handleClick(id)}>
      <DeleteIcon className={classes.deleteIcon} onClick={deletePalette} />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
