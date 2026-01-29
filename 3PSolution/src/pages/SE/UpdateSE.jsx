import React, { useEffect, useState } from "react";
import {
    FileText,
    DollarSign,
    CreditCard,
    Banknote,
    AlertCircle,
    Save,
    ArrowLeft,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useSeDetailsByIdQuery, useUpdateSeMutation } from "../../redux/features/seSlice";

const UpdateSE = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useSeDetailsByIdQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [updateSe, { isLoading: isUpdating }] = useUpdateSeMutation();

    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        constingAmount: "",
        paymentBCBL: "",
        paymentHand: "",
        remarks: "",
    });

    /* ---------------- SET DATA FROM API ---------------- */
    useEffect(() => {
        if (data) {
            setFormData({
                projectName: data.projectName || "",
                description: data.description || "",
                constingAmount: data.constingAmount || "",
                paymentBCBL: data.paymentBCBL || "",
                paymentHand: data.paymentHand || "",
                remarks: data.remarks || "",
            });
        }
    }, [data]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /* ---------------- CALCULATE DUE ---------------- */
    const totalPaid = (Number(formData.paymentBCBL) || 0) + (Number(formData.paymentHand) || 0);
    const paymentDue = (Number(formData.constingAmount) || 0) - totalPaid;

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async () => {

        const userInfo = JSON.parse(localStorage.getItem("user")) || {};

        const res = await updateSe({
            id,
            body: {
                ...formData,
                updateBy: userInfo.name,
            },
        });

        if (res?.error) {
            alert("Update failed");
            return;
        }

        navigate("/se");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="text-slate-600 mt-4 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="bg-white rounded-2xl shadow-xl mx-auto overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-white flex items-center gap-2">
                            <FileText size={24} />
                            Update Service Entry
                        </h1>
                        <p className="text-blue-100 text-sm mt-0.5">
                            Modify expense details and payment information
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/se")}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 active:scale-95"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-5">
                    {/* Project Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                            <FileText size={16} className="text-slate-600" />
                            Project Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={formData.projectName}
                            onChange={(e) => handleChange("projectName", e.target.value)}
                            placeholder="Enter project name"
                            className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                            <FileText size={16} className="text-slate-600" />
                            Description
                        </label>
                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Enter service description"
                            className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Amounts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Cost */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                <DollarSign size={16} className="text-blue-600" />
                                Total Cost <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 font-bold">৳</span>
                                <input
                                    type="number"
                                    value={formData.constingAmount}
                                    onChange={(e) => handleChange("constingAmount", e.target.value)}
                                    placeholder="0"
                                    className="w-full border-2 border-blue-200 bg-blue-50 rounded-lg pl-9 pr-4 py-3 text-sm font-semibold text-blue-900 focus:border-blue-500 focus:bg-blue-100 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* BCBL Payment */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                <CreditCard size={16} className="text-indigo-600" />
                                Bank (BCBL)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-700 font-bold">৳</span>
                                <input
                                    type="number"
                                    value={formData.paymentBCBL}
                                    onChange={(e) => handleChange("paymentBCBL", e.target.value)}
                                    placeholder="0"
                                    className="w-full border-2 border-indigo-200 bg-indigo-50 rounded-lg pl-9 pr-4 py-3 text-sm font-semibold text-indigo-900 focus:border-indigo-500 focus:bg-indigo-100 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Cash Payment */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                <Banknote size={16} className="text-amber-600" />
                                Cash
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-700 font-bold">৳</span>
                                <input
                                    type="number"
                                    value={formData.paymentHand}
                                    onChange={(e) => handleChange("paymentHand", e.target.value)}
                                    placeholder="0"
                                    className="w-full border-2 border-amber-200 bg-amber-50 rounded-lg pl-9 pr-4 py-3 text-sm font-semibold text-amber-900 focus:border-amber-500 focus:bg-amber-100 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Due Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                <AlertCircle size={16} className={
                                    paymentDue > 0 ? 'text-red-600' :
                                        paymentDue < 0 ? 'text-amber-600' :
                                            'text-emerald-600'
                                } />
                                Due Amount
                            </label>
                            <div className={`rounded-lg px-4 py-3 text-sm font-bold flex items-center justify-between border-2 ${paymentDue > 0 ? 'bg-red-50 text-red-700 border-red-200' :
                                paymentDue < 0 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                                }`}>
                                <span>৳ {paymentDue.toLocaleString()}</span>
                                {paymentDue === 0 && (
                                    <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">Paid</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary Card */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <span className="text-slate-600 font-medium">Total Cost:</span>
                                <span className="font-bold text-slate-800">৳ {Number(formData.constingAmount || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                                <span className="text-slate-600 font-medium">Total Paid:</span>
                                <span className="font-bold text-slate-800">৳ {totalPaid.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${paymentDue > 0 ? 'bg-red-600' :
                                    paymentDue < 0 ? 'bg-amber-600' :
                                        'bg-emerald-600'
                                    }`}></div>
                                <span className="text-slate-600 font-medium">Due:</span>
                                <span className={`font-bold ${paymentDue > 0 ? 'text-red-700' :
                                    paymentDue < 0 ? 'text-amber-700' :
                                        'text-emerald-700'
                                    }`}>
                                    ৳ {paymentDue.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                            <FileText size={16} className="text-slate-600" />
                            Remarks
                        </label>
                        <textarea
                            rows={3}
                            value={formData.remarks}
                            onChange={(e) => handleChange("remarks", e.target.value)}
                            placeholder="Add any additional notes"
                            className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t flex justify-between items-center">
                    <p className="text-sm text-slate-600">
                        <span className="text-red-500">*</span> Required fields
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/se")}
                            className="px-5 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isUpdating}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                        >
                            {isUpdating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Update
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateSE;