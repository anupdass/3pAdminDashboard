import React from "react";

const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-100 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
                <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
                <h2 className="text-2xl font-semibold mb-2">Unauthorized</h2>
                <p className="text-gray-600 mb-6">
                    You do not have permission to access this page.
                </p>

            </div>
        </div>
    );
};

export default Unauthorized;
