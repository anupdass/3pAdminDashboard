import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ node, children }) => {
    const token = localStorage.getItem("token");

    // 🚫 Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    let roles = [];

    try {
        const decoded = jwtDecode(token);

        // ✅ Force roles to array + normalize to NUMBER
        roles = Array.isArray(decoded?.role)
            ? decoded.role.map(Number)
            : decoded?.role
                ? [Number(decoded.role)]
                : [];
    } catch (err) {
        return <Navigate to="/login" replace />;
    }


    if (node && !roles.includes(Number(node))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // ✅ Allowed
    return children;
};

export default ProtectedRoute;

