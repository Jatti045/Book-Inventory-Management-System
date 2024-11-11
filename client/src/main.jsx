import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/components/AppSidebar";
import { BrowserRouter as Router } from "react-router-dom";
import {Toaster} from "@/components/ui/toaster.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <SidebarProvider className="bg-gradient-to-b from-amber-50 to-white">
        <AppSidebar />
          <SidebarTrigger className="absolute sm:relative min-w-8 max-w-8 text-amber-900 hover:text-amber-900 hover:bg-amber-100 scale-150 mx-4 mt-10" />
        <App />
          <Toaster />
      </SidebarProvider>
    </Router>
  </StrictMode>
);
