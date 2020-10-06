import React, { useState, useEffect } from "react";

//Dependencies
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/styles";

//Styles
import styles from "../styles/ColorBoxStyles";

function ColorBox({ name, background, moreUrl, classes, showingFullPalette }) {
  //Initial state for ColorBox
  const [copied, setCopied] = useState(false);

  //After clicking on the color box expands colorbox for 1.5s
  const changeCopyState = () => {
    setCopied(true);
  };

  //Rerenders every time copied has changed
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      {/* One rectangle  */}
      <div
        style={{
          background,
        }}
        className={classes.ColorBox}
      >
        <div
          style={{ background }}
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
        ></div>

        {/* Message that pops up */}
        <div className={`${classes.copyMsg} ${copied && classes.showCopyMsg}`}>
          <h1>Copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>

        {/*Name, Copy and More button */}
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          // Prevents copy functionality after clicking on more button
          <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColorBox);
