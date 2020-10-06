import sizes from "./sizes";

export default {
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },

  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "22px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "#000",
    },
    [sizes.down("xs")]: {
      display: "none",
    },
  },

  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem",
  },

  slider: {
    width: "340px",
    margin: "0 10px",
    display: "inline-block",
    "& .rc-slider-track": {
      backgroundColor: "transparent",
    },
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover": {
      backgroundColor: "#000000",
      outline: "none",
      border: "2px solid #000",
      boxShadow: "none",
      width: "13px",
      height: "13px",
      // marginLeft: "0px",
      marginTop: "-3px",
    },
    [sizes.down("sm")]: {
      width: "150px",
    },
  },
};