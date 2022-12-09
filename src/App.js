import "./styles.css";
import Grid from "@material-ui/core/Grid";
import Helmet from "react-helmet";
import Ships from "./Components/Ship";

import Slider from "./Components/Slider";

export default function App() {
  return (
    <>
      <Slider />

      <div className="App">
        <Helmet>
          <style>{"body { background-color: #282829; }"}</style>
        </Helmet>
        <div className="header">Space The Final Frontier For War</div>

        <Grid container>
          <Grid>
            <div className="cards">
              <Ships />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
