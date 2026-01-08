import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, ChevronDown } from "lucide-react";
import { NODES } from "../config/permissions";
import { jwtDecode } from "jwt-decode";

const ICONS = {
    LayoutDashboard: <LayoutDashboard size={20} />,
    Users: <Users size={20} />,
    Settings: <Settings size={20} />,
};

const Sidebar = ({ collapsed, mobileOpen, closeMobile }) => {
    const location = useLocation();
    const sidebarRef = useRef(null);

    const [openMenus, setOpenMenus] = useState({}); // dynamic open state

    const token = localStorage.getItem("token");

    const decoded = jwtDecode(token);
    const roles = decoded?.role || [];

    const canAccess = (id) => roles.includes(id);

    /* Click outside → close mobile sidebar */
    useEffect(() => {
        const handler = (e) => {
            if (mobileOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                closeMobile();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [mobileOpen, closeMobile]);

    const handleNav = () => {
        if (mobileOpen) closeMobile();
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" />}

            <aside
                ref={sidebarRef}
                className={`
          fixed md:static z-50 h-screen md:h-auto bg-slate-900 text-slate-200
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "left-0" : "-left-64 md:left-0"}
        `}
            >
                <div className="h-14 flex items-center justify-center border-b border-slate-700">
                    <span className="font-bold">{collapsed ? "A" : "Admin Panel"}</span>
                </div>

                <nav className="p-3 space-y-1 text-sm">
                    {NODES.map((node) => {
                        // Filter children by permission
                        // const accessibleChildren =
                        //     node.children?.filter((child) => canAccess(child.id))  || [];

                        const accessibleChildren =
                            node.children?.filter(
                                (child) => canAccess(child.id) && child.name
                            ) || [];

                        // Skip parent if it has children but none accessible
                        if (node.children && node.children.length > 0 && accessibleChildren.length === 0)
                            return null;

                        // Skip parent without children if user cannot access
                        if ((!node.children || node.children.length === 0) && !canAccess(node.id)) return null;

                        const hasChildren = accessibleChildren.length > 0;

                        return (
                            <div key={node.id}>
                                {hasChildren ? (
                                    // parent with accessible children → toggle button
                                    <button
                                        onClick={() =>
                                            setOpenMenus((prev) => ({ ...prev, [node.id]: !prev[node.id] }))
                                        }
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800"
                                    >
                                        <span className="flex items-center gap-3 ">
                                            {node.icon && ICONS[node.icon]}
                                            {!collapsed && node.name}
                                        </span>
                                        {!collapsed && (
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform ${openMenus[node.id] ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </button>
                                ) : (
                                    // parent without children → just link
                                    <Link
                                        to={node.path}
                                        onClick={handleNav}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 ${isActive(node.path) ? "bg-sky-600 text-white  " : ""
                                            }`}
                                    >
                                        {node.icon && ICONS[node.icon]}
                                        {!collapsed && node.name}
                                    </Link>
                                )}

                                {/* Render accessible children */}
                                {!collapsed &&
                                    hasChildren &&
                                    openMenus[node.id] &&
                                    accessibleChildren.map((child) => (
                                        <Link
                                            key={child.id}
                                            to={child.path}
                                            onClick={handleNav}
                                            className={`block pl-15 py-2 rounded hover:bg-slate-800 ${isActive(child.path) ? "bg-sky-600 text-white" : ""
                                                }`}
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
