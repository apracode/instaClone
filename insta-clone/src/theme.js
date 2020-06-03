import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[300]
    },
    secondary: {
      main: grey[900]
    }
  }
});

export default theme;
