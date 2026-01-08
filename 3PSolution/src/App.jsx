import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Read user synchronously from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in → render login page only
  if (!user) return <AppRoutes closeMobile={() => setMobileOpen(false)} />;

  // Logged in → show layout with sidebar/navbar
  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 min-h-screen bg-slate-100">
        <Navbar
          toggleDesktop={() => setCollapsed(!collapsed)}
          toggleMobile={() => setMobileOpen(true)}
        />
        {/* Render page content only */}
        <AppRoutes />
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default AppWrapper;
