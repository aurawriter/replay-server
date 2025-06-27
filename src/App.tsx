import { DarkMode, LightMode } from "@mui/icons-material";
import {
  createTheme,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
  useColorScheme,
} from "@mui/material";
import { ReplayDatagrid } from "./ReplayDatagrid";

export function App() {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Stack direction={"row"} spacing={2}>
        <Typography variant="h5">Staraptor Showdown Replay Server</Typography>

        <IconButton onClick={toggleTheme} aria-label="Toggle theme">
          {mode === "light" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Stack>
      <ReplayDatagrid></ReplayDatagrid>
    </div>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function App2() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
