import React, { useState, useEffect } from "react";
import { NODES } from "../config/permissions";

const UpdateRoleModal = ({ open, onClose, user, onUpdate, loading }) => {
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        setSelectedRoles(user?.role || []);
    }, [user]);

    if (!open) return null;

    const toggleRole = (id) => {
        setSelectedRoles((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(user._id, selectedRoles);
    };

    const renderNodes = (nodes, level = 0) =>
        nodes.map((node) => (
            <div key={node.id} style={{ marginLeft: `${level * 16}px` }} className="mb-1">
                {
                    (node.name || node.roleName) && (
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700 hover:text-blue-600">
                            <input
                                type="checkbox"
                                checked={selectedRoles.includes(node.id)}
                                onChange={() => toggleRole(node.id)}
                                className="w-4 h-4"
                            />
                            {node.name || node.roleName}
                        </label>
                    )
                }
                {node.children?.length > 0 && renderNodes(node.children, level + 1)}
            </div>
        ));

    return (
        <div
            className="fixed inset-0 bg-black/50  backdrop-blur-xs flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-lg">Update Roles: <span className=" text-blue-600  font-bold mb-2 pb-1border-blue-200">{user?.name}</span></h2>
                    <button onClick={onClose} disabled={loading} className="text-slate-500 hover:text-slate-700">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-3 gap-6">
                            {NODES.map((node) => (
                                <div key={node.id}>
                                    <h3 className="font-bold text-blue-600 text-sm uppercase mb-2 pb-1 border-b-2 border-blue-200">
                                        {node.name}
                                    </h3>
                                    <div className="space-y-1.5">
                                        {renderNodes([node])}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t flex justify-between items-center">
                        <span className="text-sm">{selectedRoles.length} role{selectedRoles.length !== 1 ? 's' : ''} selected</span>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Roles"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateRoleModal;