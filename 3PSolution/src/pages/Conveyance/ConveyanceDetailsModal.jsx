import React from "react";
import {
    X,
    Calendar,
    DollarSign,
    FileText,
    AlertCircle,
    Wallet,
    User
} from "lucide-react";

import { useGetConveyanceByIdQuery } from "../../redux/features/conveyanceSlice";

const ConveyanceDetailsModal = ({ id, onClose, isOpen }) => {
    const { data, isLoading } = useGetConveyanceByIdQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    if (!isOpen || !id) return null;

    const formatCurrency = (amount = 0) =>
        new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 2,
        }).format(amount);

    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            })
            : "-";

    const dueAmount =
        (data?.costingAmount || 0) - (data?.paidAmount || 0);

    const paidPercentage =
        data?.costingAmount
            ? ((data.paidAmount / data.costingAmount) * 100).toFixed(1)
            : 0;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <div>
                        <h2 className="text-xl font-bold">Conveyance Details</h2>
                        <p className="text-blue-100 text-sm mt-0.5">
                            View expense information
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 rounded-full p-2"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 overflow-y-auto flex-1 space-y-5">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            <p className="text-gray-500 mt-4">Loading details...</p>
                        </div>
                    ) : data ? (
                        <>
                            {/* Office Expenditure */}
                            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                    <FileText size={18} />
                                    <p className="text-sm font-medium">Office Expenditure</p>
                                </div>
                                <p className="text-lg font-bold text-indigo-900">
                                    {data.officeExpenditure}
                                </p>
                            </div>

                            {/* Amount Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                    <p className="text-sm font-medium text-purple-700">Costing Amount</p>
                                    <p className="text-2xl font-bold text-purple-900">
                                        {formatCurrency(data.costingAmount)}
                                    </p>
                                </div>

                                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                    <p className="text-sm font-medium text-green-700">Paid Amount</p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {formatCurrency(data.paidAmount)}
                                    </p>
                                    <p className="text-xs mt-1 text-green-700">
                                        {paidPercentage}% paid
                                    </p>
                                </div>

                                <div
                                    className={`rounded-xl p-4 border ${dueAmount > 0
                                            ? "bg-amber-50 border-amber-200"
                                            : "bg-emerald-50 border-emerald-200"
                                        }`}
                                >
                                    <p className="text-sm font-medium">
                                        {dueAmount > 0 ? "Due Amount" : "Fully Paid"}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {formatCurrency(dueAmount)}
                                    </p>
                                </div>
                            </div>

                            {/* Received Info */}
                            <div className="bg-white rounded-xl border p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <User size={18} />
                                    <h3 className="font-bold text-lg">Received Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-600">Received Name</p>
                                        <p className="font-semibold">{data.receivedName || "-"}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-600">Received Date</p>
                                        <p className="font-semibold">
                                            {formatDate(data.receivedDate)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-600">Received Amount</p>
                                        <p className="font-semibold">
                                            {formatCurrency(data.receivedAmount)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Remarks */}
                            {data.remarks && (
                                <div className="bg-slate-50 rounded-xl p-4 border">
                                    <p className="text-sm font-semibold mb-1">Remarks</p>
                                    <p className="text-slate-700">{data.remarks}</p>
                                </div>
                            )}

                            {/* Dates */}
                            <div className="bg-slate-50 rounded-xl p-4 border grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-600">Created At</p>
                                    <p className="font-semibold">
                                        {formatDate(data.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Updated At</p>
                                    <p className="font-semibold">
                                        {formatDate(data.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <AlertCircle size={32} className="mx-auto text-slate-400 mb-3" />
                            <p>No data found</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t bg-slate-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-sm font-semibold bg-white border rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConveyanceDetailsModal;
