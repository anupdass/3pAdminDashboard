import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { NODES } from "../config/permissions";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
    const getRoutes = (nodes) => {
        const allRoutes = [];

        nodes.forEach((node) => {
            if (node.path && node.element) {
                allRoutes.push(
                    <Route
                        key={node.id}
                        path={node.path}
                        element={
                            node.id === 999 ? (
                                <node.element /> // Unauthorized
                            ) : (
                                <ProtectedRoute node={node.id}>
                                    <node.element />
                                </ProtectedRoute>
                            )
                        }
                    />
                );
            }

            if (node.children && node.children.length > 0) {
                node.children.forEach((child) => {
                    if (child.path && child.element) {
                        allRoutes.push(
                            <Route
                                key={child.id}
                                path={child.path}
                                element={
                                    <ProtectedRoute node={child.id}>
                                        <child.element />
                                    </ProtectedRoute>
                                }
                            />
                        );
                    }
                });
            }
        });

        return allRoutes;
    };

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {getRoutes(NODES)}
        </Routes>
    );
};

export default AppRoutes;
