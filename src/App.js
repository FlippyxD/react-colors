import React, { useState, useEffect } from "react";

import { Route, Switch } from "react-router-dom";

import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";
import Page from "./components/Page";

import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  //Get palettes from localStorage
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

  //If palettes in localStorage => set them as hook state
  //Else load default palettes into hook state
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  function findPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  //Create miniPalette representation on "/" route
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  //Delete miniPalette
  const deletePalette = (id) => {
    setPalettes([...palettes].filter((palette) => palette.id !== id));
  };

  //callback that fires every time, that palettes are changed
  useEffect(() => {
    //Save palettes to localStorage
    const syncLocalStorage = () => {
      window.localStorage.setItem("palettes", JSON.stringify(palettes));
    };

    syncLocalStorage();
  }, [palettes]);

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      savePalette={savePalette}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />

              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm
                      savePalette={savePalette}
                      palettes={palettes}
                      {...routeProps}
                    />
                  </Page>
                )}
              />

              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      savePalette={savePalette}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
