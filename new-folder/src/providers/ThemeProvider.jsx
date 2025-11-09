import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const ThemeContext = createContext({ theme: "lightblue" });

function ThemeProvider(props) {
  const [theme, setTheme] = useState("#efefefff");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ backgroundColor: theme, height: "100vh" }}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;

export function useTheme() {
  return useContext(ThemeContext);
}
