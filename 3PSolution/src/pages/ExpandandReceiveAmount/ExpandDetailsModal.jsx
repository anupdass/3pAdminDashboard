import React from "react";
import {
    X,
    Calendar,
    DollarSign,
    FileText,
    Package,
    TrendingUp,
    AlertCircle,
    Banknote,
} from "lucide-react";
import { useGetExpenditureByIdQuery } from "../../redux/features/expenditureSlice";

const ExpenditureDetailsModal = ({ id, onClose, isOpen }) => {
    const { data, isLoading } = useGetExpenditureByIdQuery(id, {
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

    const totalExpenditure = (data?.paidAmount || 0) +
        (data?.projectLocalExp || 0) +
        (data?.conveyance || 0) +
        (data?.officeExp2 || 0);
    const remainingInHand = (data?.receivedAmount || 0) - totalExpenditure;
    const spentPercentage = data?.receivedAmount
        ? ((totalExpenditure / data.receivedAmount) * 100).toFixed(1)
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
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <div>
                        <h2 className="text-xl font-bold">Expenditure Details</h2>
                        <p className="text-emerald-100 text-sm mt-0.5">View complete expenditure information</p>
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
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
                            <p className="text-gray-500 mt-4">Loading details...</p>
                        </div>
                    ) : data ? (
                        <>
                            {/* Received Info Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <Banknote size={18} />
                                    <p className="text-sm font-medium">Received From</p>
                                </div>
                                <p className="text-lg font-bold text-blue-900">
                                    {data.receivedName}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-blue-700">
                                    <Calendar size={14} />
                                    <p className="text-sm">
                                        {formatDate(data.receivedDate)}
                                    </p>
                                </div>
                            </div>

                            {/* Financial Summary Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Received Amount */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-blue-600 rounded-lg p-2">
                                            <DollarSign size={18} className="text-white" />
                                        </div>
                                        <p className="text-sm text-blue-700 font-medium">Received</p>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-900 mt-1">
                                        {formatCurrency(data.receivedAmount)}
                                    </p>
                                </div>

                                {/* Total Spent */}
                                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-amber-600 rounded-lg p-2">
                                            <TrendingUp size={18} className="text-white" />
                                        </div>
                                        <p className="text-sm text-amber-700 font-medium">Total Spent</p>
                                    </div>
                                    <p className="text-2xl font-bold text-amber-900 mt-1">
                                        {formatCurrency(totalExpenditure)}
                                    </p>
                                    <div className="mt-2 bg-amber-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-amber-600 h-full transition-all duration-500"
                                            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-amber-700 mt-1.5 font-medium">
                                        {spentPercentage}% spent
                                    </p>
                                </div>

                                {/* Remaining In Hand */}
                                <div className={`bg-gradient-to-br ${remainingInHand >= 0
                                    ? 'from-green-50 to-green-100 border-green-200'
                                    : 'from-red-50 to-red-100 border-red-200'
                                    } rounded-xl p-4 border shadow-sm`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`${remainingInHand >= 0 ? 'bg-green-600' : 'bg-red-600'
                                            } rounded-lg p-2`}>
                                            <AlertCircle size={18} className="text-white" />
                                        </div>
                                        <p className={`text-sm ${remainingInHand >= 0 ? 'text-green-700' : 'text-red-700'
                                            } font-medium`}>
                                            {remainingInHand >= 0 ? 'Remaining' : 'Overspent'}
                                        </p>
                                    </div>
                                    <p className={`text-2xl font-bold mt-1 ${remainingInHand >= 0 ? 'text-green-900' : 'text-red-900'
                                        }`}>
                                        {formatCurrency(Math.abs(remainingInHand))}
                                    </p>
                                </div>
                            </div>

                            {/* Office Expenditure Section */}
                            {data.officeExpenditure > 0 && (
                                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package size={18} className="text-purple-700" />
                                        <h4 className="font-bold text-purple-900">Office Expenditure (Initial)</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-900">
                                        {formatCurrency(data.officeExpenditure)}
                                    </p>
                                </div>
                            )}

                            {/* Project Costing Breakdown */}
                            <div className="bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp size={20} className="text-slate-700" />
                                    <h3 className="font-bold text-slate-800 text-lg">Project Costing (SNS)</h3>
                                </div>

                                {/* UOM & Quantity */}
                                {(data.uom || data.qty > 0) && (
                                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200">
                                        {data.uom && (
                                            <div>
                                                <p className="text-sm text-slate-600 mb-1">Unit of Measure</p>
                                                <p className="font-semibold text-slate-800">{data.uom}</p>
                                            </div>
                                        )}
                                        {data.qty > 0 && (
                                            <div>
                                                <p className="text-sm text-slate-600 mb-1">Quantity</p>
                                                <p className="font-semibold text-slate-800">{data.qty}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Expenditure Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Paid Amount */}
                                    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 border border-indigo-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                            <p className="text-sm text-indigo-700 font-medium">Paid Amount</p>
                                        </div>
                                        <p className="text-xl font-bold text-indigo-900">
                                            {formatCurrency(data.paidAmount)}
                                        </p>
                                    </div>

                                    {/* Project Local Exp */}
                                    <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-4 border border-teal-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                                            <p className="text-sm text-teal-700 font-medium">Project Local Exp.</p>
                                        </div>
                                        <p className="text-xl font-bold text-teal-900">
                                            {formatCurrency(data.projectLocalExp)}
                                        </p>
                                    </div>

                                    {/* Conveyance */}
                                    <div className="bg-gradient-to-br from-cyan-50 to-white rounded-lg p-4 border border-cyan-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                                            <p className="text-sm text-cyan-700 font-medium">Conveyance</p>
                                        </div>
                                        <p className="text-xl font-bold text-cyan-900">
                                            {formatCurrency(data.conveyance)}
                                        </p>
                                    </div>

                                    {/* Office Expenditure 2 */}
                                    <div className="bg-gradient-to-br from-violet-50 to-white rounded-lg p-4 border border-violet-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                                            <p className="text-sm text-violet-700 font-medium">Office Expenditure</p>
                                        </div>
                                        <p className="text-xl font-bold text-violet-900">
                                            {formatCurrency(data.officeExp2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Total Amount Display */}
                                <div className="mt-4 pt-4 border-t-2 border-slate-300">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-semibold text-slate-700">Total Amount:</p>
                                        <p className="text-2xl font-bold text-emerald-700">
                                            {formatCurrency(data.totalAmount || totalExpenditure)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Remarks */}
                            {data.remarks && (
                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText size={18} className="text-amber-700" />
                                        <h4 className="font-bold text-amber-900">Remarks</h4>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">
                                        {data.remarks}
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

                            {/* Status Badge */}
                            {/* <div className="flex justify-center">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${data.status === 1
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full ${data.status === 1 ? 'bg-green-600' : 'bg-gray-600'}`}></div>
                                    {data.status === 1 ? 'Active' : 'Inactive'}
                                </span>
                            </div> */}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <AlertCircle size={32} className="text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium">No data found</p>
                            <p className="text-slate-400 text-sm mt-1">Unable to retrieve expenditure details</p>
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

export default ExpenditureDetailsModal;