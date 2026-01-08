import React, { useState, useEffect } from "react";

const CustomModal = ({ open, mode, user, onClose, onSubmit, loading, error }) => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(1);


    useEffect(() => {
        if (mode === "edit" && user) {
            setName(user.name || "");
            setMobile(user.mobile || "");
            setStatus(user.status === 1 ? 1 : 0);
        } else {
            setName("");
            setMobile("");
            setPassword("");
            setStatus(1);
        }
    }, [mode, user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { name, mobile };
        if (mode === "create") payload.password = password;
        if (mode === "edit") payload.status = status;
        if (mode === "edit" && user && user._id) payload.id = user._id;
        onSubmit(payload);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl mb-4">{mode === "create" ? "Create User" : "Edit User"}</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {mode === "create" && (
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded"
                            required
                        />
                    )}

                    {mode === "edit" && (
                        <select
                            value={status}
                            onChange={(e) => setStatus(Number(e.target.value))}
                            className="w-full border p-2 rounded"
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    )}

                    {error && (
                        <p className="text-red-500 text-sm">{error?.data?.message || "Something went wrong"}</p>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-50"
                        >
                            {loading ? (mode === "create" ? "Creating..." : "Saving...") : (mode === "create" ? "Create" : "Save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomModal;
