import { createContext } from "react";

export const Context = createContext({
  toggleTheme: () => {},
  isDarkTheme: false,
  updateFirebase: () => {},
  firebase: [],
});
