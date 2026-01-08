import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                closeMobile={() => setMobileOpen(false)}
            />

            <div className="flex-1 flex flex-col bg-slate-100">
                <Navbar
                    toggleDesktop={() => setCollapsed(!collapsed)}
                    toggleMobile={() => setMobileOpen(true)}
                />
                <main className="p-4 flex-1">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
