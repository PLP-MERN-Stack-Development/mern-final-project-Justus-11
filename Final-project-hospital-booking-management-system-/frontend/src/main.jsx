import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";  
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";
import { StrictMode } from "react";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    </BrowserRouter>,
  
) 