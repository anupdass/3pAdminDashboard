import React from 'react';
import { useGetClientPoByIdQuery } from '../redux/features/clientPoSlice';
import {
    X,
    Calendar,
    DollarSign,
    User,
    FileText,
    CreditCard,
    TrendingUp,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

const PoDetailsModal = ({ id, onClose, isOpen }) => {
    const { data, isLoading } = useGetClientPoByIdQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    if (!isOpen || !id) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const totalAdvanced = Number(data?.poAccountPay || 0) + Number(data?.poHandPay || 0);
    const advancedPercentage = data?.poValue
        ? ((totalAdvanced / data.poValue) * 100).toFixed(1)
        : 0;
    const isFullyPaid = data?.poDueAmount === 0;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <div>
                        <h2 className="text-xl font-bold">Purchase Order Details</h2>
                        <p className="text-blue-100 text-sm mt-0.5">Complete PO information and payment status</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 rounded-full p-2 transition-all duration-200 active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 px-6 py-5">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            <p className="text-gray-500 mt-4">Loading details...</p>
                        </div>
                    ) : data ? (
                        <div className="space-y-5">
                            {/* Client Information Card */}
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                                <div className="flex items-center gap-2 text-slate-600 mb-2">
                                    <User size={20} />
                                    <p className="text-sm font-medium">Client Information</p>
                                </div>
                                <p className="text-2xl font-bold text-slate-800">
                                    {data.clientName}
                                </p>
                            </div>

                            {/* Financial Overview Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* PO Value */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-blue-600 rounded-lg p-2">
                                            <DollarSign size={18} className="text-white" />
                                        </div>
                                        <p className="text-sm text-blue-700 font-medium">PO Value</p>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-900 mt-1">
                                        {formatCurrency(data.poValue)}
                                    </p>
                                </div>

                                {/* Total Advanced */}
                                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-emerald-600 rounded-lg p-2">
                                            <TrendingUp size={18} className="text-white" />
                                        </div>
                                        <p className="text-sm text-emerald-700 font-medium">Total Advanced</p>
                                    </div>
                                    <p className="text-2xl font-bold text-emerald-900 mt-1">
                                        {formatCurrency(totalAdvanced)}
                                    </p>
                                    <div className="mt-2 bg-emerald-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-emerald-600 h-full transition-all duration-500"
                                            style={{ width: `${Math.min(advancedPercentage, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-emerald-700 mt-1.5 font-medium">
                                        {advancedPercentage}% of PO value
                                    </p>
                                </div>

                                {/* Due Amount */}
                                <div className={`bg-gradient-to-br ${isFullyPaid
                                        ? 'from-gray-50 to-gray-100 border-gray-200'
                                        : 'from-orange-50 to-orange-100 border-orange-200'
                                    } rounded-xl p-4 border shadow-sm`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`${isFullyPaid ? 'bg-gray-600' : 'bg-orange-600'
                                            } rounded-lg p-2`}>
                                            {isFullyPaid ? (
                                                <CheckCircle size={18} className="text-white" />
                                            ) : (
                                                <AlertCircle size={18} className="text-white" />
                                            )}
                                        </div>
                                        <p className={`text-sm ${isFullyPaid ? 'text-gray-700' : 'text-orange-700'
                                            } font-medium`}>
                                            {isFullyPaid ? 'Fully Paid' : 'Due Amount'}
                                        </p>
                                    </div>
                                    <p className={`text-2xl font-bold mt-1 ${isFullyPaid ? 'text-gray-900' : 'text-orange-900'
                                        }`}>
                                        {formatCurrency(data.poDueAmount)}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Breakdown */}
                            <div className="bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard size={20} className="text-slate-700" />
                                    <h3 className="font-bold text-slate-800 text-lg">Payment Breakdown</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Account Payment */}
                                    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 border border-indigo-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                            <p className="text-sm text-indigo-700 font-medium">Account Payment</p>
                                        </div>
                                        <p className="text-xl font-bold text-indigo-900">
                                            {formatCurrency(data.poAccountPay)}
                                        </p>
                                    </div>

                                    {/* Hand Cash Payment */}
                                    <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg p-4 border border-amber-200">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                                            <p className="text-sm text-amber-700 font-medium">Hand Cash Payment</p>
                                        </div>
                                        <p className="text-xl font-bold text-amber-900">
                                            {formatCurrency(data.poHandPay)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-200 rounded-lg p-2.5">
                                            <Calendar size={20} className="text-slate-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 font-medium">PO Date</p>
                                            <p className="text-base font-bold text-slate-800 mt-0.5">
                                                {formatDate(data.poDate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-200 rounded-lg p-2.5">
                                            <Calendar size={20} className="text-slate-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 font-medium">Payment Date</p>
                                            <p className="text-base font-bold text-slate-800 mt-0.5">
                                                {formatDate(data.paymentDate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Remarks */}
                            {data.poRemarks && (
                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                    <div className="flex items-center gap-2 mb-3">
                                        <FileText size={18} className="text-amber-700" />
                                        <h4 className="font-bold text-amber-900">Remarks</h4>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                        {data.poRemarks}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <AlertCircle size={32} className="text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium">No data found</p>
                            <p className="text-slate-400 text-sm mt-1">Unable to retrieve purchase order details</p>
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

export default PoDetailsModal;