import React, { useEffect } from 'react';
import { useGetClientPoByIdQuery } from '../redux/features/clientPoSlice';
import { X, Calendar, DollarSign, User, FileText, CreditCard, Banknote } from 'lucide-react';

const PoDetailsModal = ({ id, onClose, isOpen }) => {
    const { data, isLoading, refetch } = useGetClientPoByIdQuery(id, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        refetch();
    }, [id]);

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

    if (!isOpen || !id) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl flex items-center justify-between sticky top-0">
                    <h2 className="text-2xl font-bold">Purchase Order Details</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : data ? (
                        <div className="space-y-6">
                            {/* Client Information */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <User className="text-blue-600" size={20} />
                                    <h3 className="text-lg font-semibold text-gray-800">Client Information</h3>
                                </div>
                                <p className="text-2xl font-bold text-blue-700">{data.clientName}</p>
                            </div>

                            {/* PO Value */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="text-blue-600" size={18} />
                                        <p className="text-sm text-gray-600 font-medium">PO Value</p>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-700">
                                        {formatCurrency(data.poValue)}
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-orange-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="text-orange-600" size={18} />
                                        <p className="text-sm text-gray-600 font-medium">Due Amount</p>
                                    </div>
                                    <p className="text-2xl font-bold text-orange-700">
                                        {formatCurrency(data.poDueAmount)}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard className="text-emerald-600" size={20} />
                                    <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">Account Payment</p>
                                        <p className="text-lg font-bold text-emerald-700">
                                            {formatCurrency(data.poAccountPay)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">Hand Cash Payment</p>
                                        <p className="text-lg font-bold text-emerald-700">
                                            {formatCurrency(data.poHandPay)}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-emerald-300">
                                    <p className="text-xs text-gray-600 mb-1">Total Advanced</p>
                                    <p className="text-xl font-bold text-emerald-800">
                                        {formatCurrency(Number(data.poAccountPay) + Number(data.poHandPay))}
                                    </p>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="text-gray-600" size={18} />
                                        <p className="text-sm text-gray-600 font-medium">PO Date</p>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800">
                                        {formatDate(data.poDate)}
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="text-gray-600" size={18} />
                                        <p className="text-sm text-gray-600 font-medium">Payment Date</p>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800">
                                        {formatDate(data.paymentDate)}
                                    </p>
                                </div>
                            </div>

                            {/* Remarks */}
                            {data.poRemarks && (
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="text-gray-600" size={18} />
                                        <p className="text-sm text-gray-600 font-medium">Remarks</p>
                                    </div>
                                    <p className="text-gray-800 whitespace-pre-wrap">{data.poRemarks}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No data found</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 rounded-b-xl flex justify-end gap-3 border-t">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PoDetailsModal;