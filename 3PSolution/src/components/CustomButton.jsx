import React from 'react';

const CustomButton = ({ btnText, onClick, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-5 py-2.5 mb-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {btnText}
        </button>
    );
};

export default CustomButton;
