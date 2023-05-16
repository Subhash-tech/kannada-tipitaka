import { common } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core";
import typography from "./typography";

const theme = createTheme({
  palette: {
    background: {
      default: "#eee",
      paper: common.white,
    },
    primary: {
      main: "#01579b",
      dark: "#002f6c",
      light: "#4f83cc",
      contrastText: "",
    },
    secondary: {
      main: "#0e4378",
      dark: "#001729",
      light: "#d6d6d6",
      contrastText: "",
    },
    success: {
      main: "#62c370",
    },
    error: {
      main: "#ee2e31",
    },
    warning: {
      main: "#f1d302",
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 8,
  typography,
  overrides: {
    MuiTab: {
      root: {
        minHeight: "fit-content"
      }
    },
    MuiTabs: {
      root: {
        minHeight: "fit-content"
      }
    }
  }
});

export default theme;
