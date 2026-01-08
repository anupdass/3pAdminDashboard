import React from 'react';
import { Link } from 'react-router-dom'

const ButtonForNavigate = ({ btnText, navigate }) => {
    return (
        <Link to={navigate}>
            <button
                className={`px-5 py-2.5 mb-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {btnText}
            </button>
        </Link>
    );
};

export default ButtonForNavigate;
