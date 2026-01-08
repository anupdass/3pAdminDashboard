import { useState, useRef, useEffect } from "react";

const Navbar = ({ toggleDesktop, toggleMobile }) => {
    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("roles");
        window.location.href = "/login";
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="h-14 bg-white flex items-center justify-between px-4 shadow">
            <button onClick={toggleDesktop} className="md:block hidden">
                ☰
            </button>
            <button onClick={toggleMobile} className="md:hidden">
                ☰
            </button>

            {token && (
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                        Account ▾
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Profile
                            </button>

                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Settings
                            </button>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
