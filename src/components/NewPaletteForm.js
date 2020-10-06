import React, { useState, useRef, useEffect } from "react";

import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import seedColors from "../seedColors";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";

import { ValidatorForm } from "react-material-ui-form-validator";

import arrayMove from "array-move";

import styles from "../styles/NewPaletteFormStyles";

function NewPaletteFrom({ palettes, savePalette, history }) {
  const classes = styles();

  //Initial states
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("pink");
  const [colors, setColors] = useState(seedColors[0].colors);
  const [newName, setNewName] = useState({
    newColorName: "",
    newPaletteName: "",
  });

  //handle ref="xyz" error -> Note for myself: investigate this more, it should be refactored
  const validatorFormRef = useRef("form");

  //Helper variables
  const maxColors = 20; //Set the max number of colors in palette
  const fullPalette = colors.length >= maxColors;

  //Set up new input validators
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  //Open the drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  //Close the drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Update the "Add Color" button backgroundColor to match the selected color in <ChromePicker />
  //newColor returns object -> newColor.hex returns hex code e.g. "#ffffff"
  const updateCrrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  //Add new color
  const addNewColor = () => {
    //Create a new object with color selected on <ChromePicker /> && name entered in input from <Validator />
    const newColor = { color: currentColor, name: newName.newColorName };

    //Push newColor into initialColors
    setColors([...colors, newColor]);

    //Reset input value to empty string
    setNewName({
      ...newName,
      newColorName: "",
    });
  };

  //Remove Color -> by the color name
  const removeColor = (colorName) => {
    setColors([...colors].filter((color) => colorName !== color.name));
  };

  //Clear All of the colors
  const clearColors = () => {
    setColors([]);
  };

  //Add box with random color into draggable area
  const addRandomColor = () => {
    //Create one big array of all of the used colors
    const allColors = palettes.map((p) => p.colors).flat();

    //Initiate variables
    let randomNum;
    let randomColor;

    //Define function outside of the loop to prevent warnings
    const checkDuplicateColor = (colorName) => {
      return colors.some((color) => color.name === colorName);
    };

    //Prevent duplicate colors to enter the array after using "Random Color" button
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      //Pick random number
      randomNum = Math.floor(Math.random() * allColors.length);

      //Pick the random color
      randomColor = allColors[randomNum];

      //Check if color si already in array of colors
      isDuplicateColor = checkDuplicateColor(randomColor.name);
    }

    //Push the color to the array
    setColors([...colors, randomColor]);

    //possibly add extra check if name of #hex is already in array
  };

  //Set the position of draggable boxes
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  //Create new Minipalette component on "/" page
  const handleSubmit = (newPalette) => {
    //Name of the palette
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");

    newPalette.colors = colors;

    //Function passed from App.js -> pushes new miniPalette representation from passed newPalette object to function App.js
    savePalette(newPalette);

    //redirect to "/" after clicking on "SAVE PALETTE" button
    history.push("/");
  };

  //Set name of the selected square to the value in the input field
  const handleChange = (e) => {
    setNewName({ ...newName, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        newName={newName}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
        handleChange={handleChange}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={addRandomColor}
              disabled={fullPalette}
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            currentColor={currentColor}
            updateCrrentColor={updateCrrentColor}
            addNewColor={addNewColor}
            validatorFormRef={validatorFormRef}
            newName={newName}
            handleChange={handleChange}
            fullPalette={fullPalette}
          />
        </div>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={5}
        />
      </main>
    </div>
  );
}

export default NewPaletteFrom;
