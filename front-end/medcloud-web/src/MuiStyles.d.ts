import {
  PaletteColorOptions,
  AppBarPropsColorOverrides,
  IconButtonPropsColorOverrides
} from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    complementary: PaletteColorOptions;
  }
}
declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides{
    complementary: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides{
    complementary: true;
  }
}