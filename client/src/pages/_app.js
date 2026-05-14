import "@/styles/globals.css";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store.js";
import { getActiveTheme, selectTheme } from "@/redux/reducers/themeReducer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "@/styles/mui/theme";
import MyAppBar from "@/components/MyAppBar";
import { useEffect } from "react";

function ThemeApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  const currentTheme = useSelector(selectTheme).activeTheme;

  useEffect(() => {
    dispatch(getActiveTheme()); // To get the theme from the cookie
  }, []);

  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <MyAppBar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeApp Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
