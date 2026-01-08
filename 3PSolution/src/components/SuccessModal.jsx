import React from "react";

const SuccessModal = ({ open, onClose, message = "Action completed successfully!" }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Close when clicking outside
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
            >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Success</h2>
                <p className="text-sm text-slate-600 text-center mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
