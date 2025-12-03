import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <>
      <AppProvider>
        <Home />
      </AppProvider>
    </>
  );
}

export default App;
