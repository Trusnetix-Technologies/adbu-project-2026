import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveTheme,
  selectTheme,
  toggleTheme,
} from "@/redux/reducers/themeReducer";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function MyAppBar() {
  const currentTheme = useSelector(selectTheme).activeTheme;
  const dispatch = useDispatch();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Movies
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/">
            <Button
              variant="text"
              sx={{ color: (theme) => theme.palette.icon.main }}
            >
              Home
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="text"
              sx={{ color: (theme) => theme.palette.icon.main }}
            >
              Login
            </Button>
          </Link>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggleTheme())}
          >
            {currentTheme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          {/* <Link href="/blog">
          <Button color="inherit">Blog</Button>
        </Link> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
