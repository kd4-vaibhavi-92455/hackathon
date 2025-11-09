import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function ReactAppBar() {
  const [btnText, setBtnText] = useState("Login");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Home
          </Typography>
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            My Quotes
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Button color="inherit">{btnText}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
