import React from "react";
import {
    X,
    Calendar,
    DollarSign,
    FileText,
    TrendingUp,
    AlertCircle,
    Briefcase,
    CreditCard,
    Wallet,
} from "lucide-react";
import { useGetLocalPurchaseByIdQuery } from "../../redux/features/locapurchaseSlice";


const LocalPurchaseDetailsModal = ({ id, onClose, isOpen }) => {
    const { data, isLoading } = useGetLocalPurchaseByIdQuery(id, {
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

    const paidPercentage = data?.requisitionAmount
        ? ((data.totalPaid / data.requisitionAmount) * 100).toFixed(1)
        : 0;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <div>
                        <h2 className="text-xl font-bold">Local Purchase Details</h2>
                        <p className="text-blue-100 text-sm mt-0.5">View complete purchase information</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="px-6 py-5 overflow-y-auto flex-1 space-y-5">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            <p className="text-gray-500 mt-4">Loading details...</p>
                        </div>
                    ) : data ? (
                        <>
                            {/* Project Info Card */}
                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                                    <Briefcase size={18} />
                                    <p className="text-sm font-medium">Project Name</p>
                                </div>
                                <p className="text-lg font-bold text-indigo-900">
                                    {data.projectName}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-indigo-700">
                                    <Calendar size={14} />
                                    <p className="text-sm">
                                        {formatDate(data.date)}
                                    </p>
                                </div>
                            </div>

                            {/* Financial Summary Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Requisition Amount */}
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-purple-600 rounded-lg p-2">
                                            <DollarSign size={18} className="text-white" />
                                        </div>
                                        <p className="text-sm text-purple-700 font-medium">Requisition</p>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-900 mt-1">
                                        {formatCurrency(data.requisitionAmount)}
                                    </p>
                                </div>

                                {/* Total Paid */}
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-green-600 rounded-lg p-2">
                                            <TrendingUp size={18} className="text-white" />
                                        </div>
                                        <p className="text-sm text-green-700 font-medium">Total Paid</p>
                                    </div>
                                    <p className="text-2xl font-bold text-green-900 mt-1">
                                        {formatCurrency(data.totalPaid)}
                                    </p>
                                    <div className="mt-2 bg-green-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-green-600 h-full transition-all duration-500"
                                            style={{ width: `${Math.min(paidPercentage, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-green-700 mt-1.5 font-medium">
                                        {paidPercentage}% paid
                                    </p>
                                </div>

                                {/* Due Amount */}
                                <div className={`bg-gradient-to-br ${data.dueAmount > 0
                                    ? 'from-amber-50 to-amber-100 border-amber-200'
                                    : 'from-emerald-50 to-emerald-100 border-emerald-200'
                                    } rounded-xl p-4 border shadow-sm`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`${data.dueAmount > 0 ? 'bg-amber-600' : 'bg-emerald-600'
                                            } rounded-lg p-2`}>
                                            <AlertCircle size={18} className="text-white" />
                                        </div>
                                        <p className={`text-sm ${data.dueAmount > 0 ? 'text-amber-700' : 'text-emerald-700'
                                            } font-medium`}>
                                            {data.dueAmount > 0 ? 'Due Amount' : 'Fully Paid'}
                                        </p>
                                    </div>
                                    <p className={`text-2xl font-bold mt-1 ${data.dueAmount > 0 ? 'text-amber-900' : 'text-emerald-900'
                                        }`}>
                                        {formatCurrency(data.dueAmount)}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Breakdown */}
                            <div className="bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard size={20} className="text-slate-700" />
                                    <h3 className="font-bold text-slate-800 text-lg">Payment Breakdown</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Paid SNS */}
                                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            <p className="text-sm text-blue-700 font-medium">Paid SNS</p>
                                        </div>
                                        <p className="text-xl font-bold text-blue-900">
                                            {formatCurrency(data.paidSNS)}
                                        </p>
                                    </div>

                                    {/* Paid MWTIL */}
                                    <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-4 border border-teal-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                            <p className="text-sm text-teal-700 font-medium">Paid MWTIL</p>
                                        </div>
                                        <p className="text-xl font-bold text-teal-900">
                                            {formatCurrency(data.paidMWTIL)}
                                        </p>
                                    </div>

                                    {/* Petty Cash */}
                                    <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-4 border border-orange-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                            <p className="text-sm text-orange-700 font-medium">Petty Cash</p>
                                        </div>
                                        <p className="text-xl font-bold text-orange-900">
                                            {formatCurrency(data.pettyCash)}
                                        </p>
                                    </div>
                                </div>

                                {/* Total Paid Display */}
                                <div className="mt-4 pt-4 border-t-2 border-slate-300">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-semibold text-slate-700">Total Paid Amount:</p>
                                        <p className="text-2xl font-bold text-green-700">
                                            {formatCurrency(data.totalPaid)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {data.description && (
                                <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText size={18} className="text-sky-700" />
                                        <h4 className="font-bold text-sky-900">Description</h4>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        {data.description}
                                    </p>
                                </div>
                            )}

                            {/* Date Info */}
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.createdAt && (
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-200 rounded-lg p-2.5">
                                                <Calendar size={20} className="text-slate-700" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-600 font-medium">Created On</p>
                                                <p className="text-base font-bold text-slate-800 mt-0.5">
                                                    {formatDate(data.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {data.updatedAt && (
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-200 rounded-lg p-2.5">
                                                <Calendar size={20} className="text-slate-700" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-600 font-medium">Last Updated</p>
                                                <p className="text-base font-bold text-slate-800 mt-0.5">
                                                    {formatDate(data.updatedAt)}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <AlertCircle size={32} className="text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium">No data found</p>
                            <p className="text-slate-400 text-sm mt-1">Unable to retrieve local purchase details</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-semibold bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 active:scale-95 shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocalPurchaseDetailsModal;