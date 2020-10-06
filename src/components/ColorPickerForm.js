import React from "react";

import Button from "@material-ui/core/Button";

import { ChromePicker } from "react-color";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import styles from "../styles/ColorPickerFormStyles";

function ColorPickerForm({
  currentColor,
  updateCrrentColor,
  addNewColor,
  validatorFormRef,
  newName,
  handleChange,
  fullPalette,
}) {
  const classes = styles();

  return (
    <div className={classes.root}>
      <ChromePicker
        width="100%"
        color={currentColor}
        onChangeComplete={updateCrrentColor}
        className={classes.picker}
      />

      <ValidatorForm
        onSubmit={addNewColor}
        ref={validatorFormRef}
        instantValidate={false}
      >
        <TextValidator
          value={newName.newColorName}
          className={classes.colorNameInput}
          name="newColorName"
          placeholder="Color Name"
          variant="filled"
          margin="normal"
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "This field is required",
            "Name of the color must be unique",
            "Color already used!",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{ backgroundColor: fullPalette ? "grey" : currentColor }}
          disabled={fullPalette}
          className={classes.addColor}
        >
          {fullPalette ? "PALETTE FULL" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
