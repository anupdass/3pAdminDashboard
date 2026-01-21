import React, { useState, useEffect } from "react";
import DateInput from "../../components/DateInput";
import { useCreateClientPoMutation } from "../../redux/features/clientPoSlice";

const PurchaseOrderForm = () => {

    const [form, setForm] = useState({
        clientName: "",
        poValue: "",
        poAccountPay: "",    //poAccountPay
        poHandPay: "", //poHandPay
        poDate: "",
        poDueAmount: "", //poDueAmount
        paymentDate: "", //poDueDate
        poRemarks: "", //popoRemarks
    });


    const [poDate, setPoDate] = useState(new Date());

    const [createClientPo, { isLoading, error }] = useCreateClientPoMutation();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Auto-calculate due amount
    useEffect(() => {
        const poValue = parseFloat(form.poValue) || 0;
        const poAccountPay = parseFloat(form.poAccountPay) || 0;
        const poHandPay = parseFloat(form.poHandPay) || 0;
        const calculatedDue = poValue - (poAccountPay + poHandPay);

        // console.log(calculatedDue);

        if (calculatedDue !== parseFloat(form.poDueAmount)) {
            setForm(prev => ({
                ...prev,
                poDueAmount: calculatedDue > 0 ? calculatedDue.toString() : "0"
            }));
        }
    }, [form.poValue, form.poAccountPay, form.poHandPay]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await createClientPo(form).unwrap();
            console.log("Success:", res);
            alert("PO created successfully!");
        } catch (err) {
            console.error("Error:", err);
            alert(err?.data?.message || "Something went wrong");
        }
    };

    const totalAdvance = (parseFloat(form.poAccountPay) || 0) + (parseFloat(form.poHandPay) || 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2">
                        <h2 className="text-xl font-bold text-white">
                            Purchase Order Management
                        </h2>
                        <p className="text-blue-100 text-sm mt-1">Vendor & Payment Details</p>
                    </div>

                    <div className="p-6">
                        {/* Main Info Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                            <div className="lg:col-span-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-0">
                                    Client Name *
                                </label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={form.clientName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter client name"
                                    className="w-full border-2 border-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-0">
                                    PO Value *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">৳</span>
                                    <input
                                        type="number"
                                        name="poValue"
                                        value={form.poValue}
                                        onChange={handleChange}
                                        required
                                        placeholder="0.00"
                                        className="w-full border-2 border-gray-200 pl-8 pr-4 py-2.5 rounded-lg text-right focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-0">
                                    PO Date *
                                </label>
                                <DateInput
                                    value={form.poDate || new Date()}
                                    onChange={(date) => {
                                        setForm(prev => ({
                                            ...prev,
                                            poDate: date
                                        }));
                                    }}
                                    placeholder="PO Date"
                                />

                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Advance Received */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-emerald-800 text-lg">
                                        💰 Advance Received
                                    </h3>
                                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        ৳ {totalAdvance.toFixed(2)}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-0">
                                            AC Pay
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">৳</span>
                                            <input
                                                type="number"
                                                name="poAccountPay"
                                                value={form.poAccountPay}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                className="w-full border-2 border-emerald-200 pl-8 pr-4 py-2.5 rounded-lg text-right bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-0">
                                            Hand Cash
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">৳</span>
                                            <input
                                                type="number"
                                                name="poHandPay"
                                                value={form.poHandPay}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                className="w-full border-2 border-emerald-200 pl-8 pr-4 py-2.5 rounded-lg text-right bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Remaining Due */}
                            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-orange-800 text-lg">
                                        📋 Remaining Due
                                    </h3>
                                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        ৳ {(parseFloat(form.poDueAmount) || 0).toFixed(2)}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-0">
                                            Due Amount (Auto-calculated)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">৳</span>
                                            <input
                                                type="number"
                                                name="poDueAmount"
                                                value={form.poDueAmount}
                                                readOnly
                                                className="w-full border-2 border-orange-200 pl-8 pr-4 py-2.5 rounded-lg text-right bg-gray-50 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-0">
                                            Payment Date
                                        </label>
                                        <input
                                            type="date"
                                            name="paymentDate"
                                            value={form.paymentDate}
                                            onChange={(e) => {
                                                setForm(prev => ({
                                                    ...prev,
                                                    paymentDate: e.target.value
                                                }));
                                            }}
                                            className="w-full border-2 border-orange-200 px-4 py-2.5 rounded-lg bg-white focus:outline-none focus:border-orange-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* poRemarks */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-0">
                                poRemarks / Notes
                            </label>
                            <textarea
                                name="poRemarks"
                                value={form.poRemarks}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Add any additional notes or comments..."
                                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>


                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setForm({
                                    clientName: "",
                                    poValue: "",
                                    poAccountPay: "",
                                    poHandPay: "",
                                    poDate: "",
                                    poDueAmount: "",
                                    paymentDate: "",
                                    poRemarks: "",
                                })}
                                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
                            >
                                💾 Save Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseOrderForm;