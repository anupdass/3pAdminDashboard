import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ value, onChange, placeholder }) => {
    return (
        <DatePicker
            selected={value}
            onChange={(date) => onChange(date)}   // ⬅ send date to parent
            dateFormat="dd-MM-yyyy"
            placeholderText={placeholder}
            className="w-full border-2 border-gray-200 px-4 py-2.5 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
    );
};

export default DateInput;
