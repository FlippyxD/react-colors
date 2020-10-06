import React from "react";

import DeleteIcon from "@material-ui/icons/Delete";

import { withStyles } from "@material-ui/styles";

import { SortableElement } from "react-sortable-hoc";

import styles from "../styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(
  ({ classes, color, name, handleClick }) => {
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent}>
          <span> {name}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
        </div>
      </div>
    );
  }
);

export default withStyles(styles)(DraggableColorBox);