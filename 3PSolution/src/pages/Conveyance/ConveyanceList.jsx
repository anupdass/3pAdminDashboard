import React, { useState } from 'react'
import { Plus, Calendar, User, DollarSign, AlertCircle, Eye, Edit2, Trash2, Edit } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGetAllConveyanceQuery } from '../../redux/features/conveyanceSlice';
import ConveyanceDetailsModal from './ConveyanceDetailsModal';


export default function ConveyanceList() {

    const { data: expenses, isLoading, isError, error } = useGetAllConveyanceQuery();

    const [openModal, setOpenModal] = useState(false);
    const [selectedPoId, setSelectedPoId] = useState(null);

    const handleView = (id) => {
        setSelectedPoId(id);
        setOpenModal(true);
    };
    const formatCurrency = (amount = 0) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount)
    }

    const formatDate = (date) => {
        if (!date) return '-';
        try {
            return new Date(date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return '-';
        }
    }


    const totals = expenses?.reduce((acc, expense) => ({
        costingAmount: acc.costingAmount + (expense.costingAmount || 0),
        paidAmount: acc.paidAmount + (expense.paidAmount || 0),
        receivedAmount: acc.receivedAmount + (expense.receivedAmount || 0)
    }), {
        costingAmount: 0,
        paidAmount: 0,
        receivedAmount: 0
    }) || { costingAmount: 0, paidAmount: 0, receivedAmount: 0 }

    const snsGlobalLimited = 150000
    const remainingInHand = snsGlobalLimited - (totals?.paidAmount || 0)

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-12">
                        <div className="flex flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
                            <p className="text-slate-600 font-medium">Loading conveyance data...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Error State
    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg p-12">
                        <div className="flex flex-col items-center justify-center">
                            <div className="bg-red-100 rounded-full p-4 mb-4">
                                <AlertCircle size={48} className="text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Error Loading Data</h3>
                            <p className="text-slate-600 mb-4">
                                {error?.data?.message || error?.message || 'Failed to load conveyance data'}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Empty State
    if (!expenses || expenses.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 flex items-center justify-end">
                        <Link
                            to='/conveyance-create'
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                        >
                            <Plus size={20} />
                            Create New
                        </Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-12">
                        <div className="flex flex-col items-center justify-center">
                            <div className="bg-slate-100 rounded-full p-6 mb-4">
                                <DollarSign size={48} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No Conveyance Records</h3>
                            <p className="text-slate-600 mb-6">Get started by creating your first conveyance record.</p>
                            <Link
                                to='/conveyance-create'
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                            >
                                <Plus size={20} />
                                Create First Record
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                        <p className="text-sm text-slate-600 mb-1">Total Expenses</p>
                        <p className="text-2xl font-bold text-slate-800">{formatCurrency(totals.costingAmount)}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                        <p className="text-sm text-slate-600 mb-1">Total Paid</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(totals.paidAmount)}</p>
                    </div>
                    {/* <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                        <p className="text-sm text-slate-600 mb-1">SNS Global Limited</p>
                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(snsGlobalLimited)}</p>
                    </div> */}
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
                        <p className="text-sm text-slate-600 mb-1">Remaining / Due</p>
                        <p className={`text-2xl font-bold ${remainingInHand >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
                            {formatCurrency(Math.abs(totals.costingAmount - totals.paidAmount))}
                        </p>

                    </div>
                </div>

                {/* Header Section */}
                <div className="mb-6 flex items-center justify-between">

                    <Link
                        to='/conveyance-create'
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all shadow-md"
                    >
                        <Plus size={20} />
                        Create New
                    </Link>
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-100 border-b-2 border-slate-300">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider w-16">SL</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Office Expenditure</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Costing Amount</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Paid Amount</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Remarks</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Received Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Received Name</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Received Amount</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider w-32">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {expenses.map((expense, index) => (
                                    <tr key={expense._id || index} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-4 text-sm text-slate-900 font-medium">{index + 1}</td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-slate-900">
                                                {expense.officeExpenditure || '-'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-900 text-right font-medium">
                                            {formatCurrency(expense.costingAmount)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-green-700 text-right font-medium">
                                            {formatCurrency(expense.paidAmount)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600 max-w-xs truncate">
                                            {expense.remarks || '-'}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-slate-400" />
                                                {formatDate(expense.receivedDate)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <User size={14} className="text-slate-400" />
                                                {expense.receivedName || '-'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-blue-700 text-right font-medium">
                                            {formatCurrency(expense.receivedAmount)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleView(expense._id)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <Link
                                                    to={`/conveyance-edit/${expense._id}`}
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button

                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot>
                                {/* Total Expenses Row */}
                                <tr className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-t-2 border-yellow-300">
                                    <td colSpan="2" className="px-4 py-4 text-sm font-bold text-slate-900 text-right uppercase">
                                        SNS Global Expenses Total
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-slate-900 text-right">
                                        {formatCurrency(totals.costingAmount)}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-green-700 text-right">
                                        {formatCurrency(totals.paidAmount)}
                                    </td>
                                    <td className="px-4 py-4"></td>
                                    <td className="px-4 py-4"></td>
                                    <td className="px-4 py-4"></td>
                                    <td className="px-4 py-4 text-sm font-bold text-blue-700 text-right">
                                        {formatCurrency(totals.receivedAmount)}
                                    </td>
                                    <td className="px-4 py-4"></td>
                                </tr>

                                {/* SNS Global Limited Row */}
                                {/* <tr className="bg-slate-100 border-t border-slate-300">
                                    <td colSpan="2" className="px-4 py-4 text-sm font-bold text-slate-900 text-right uppercase">
                                        SNS Global Limited (B)
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-purple-700 text-right">
                                        {formatCurrency(snsGlobalLimited)}
                                    </td>
                                    <td colSpan="6" className="px-4 py-4"></td>
                                </tr> */}

                                {/* Remaining / Due Row */}
                                {/* <tr className={`border-t ${remainingInHand >= 0
                                    ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
                                    : 'bg-gradient-to-r from-red-50 to-red-100 border-red-200'}`}>
                                    <td colSpan="2" className="px-4 py-4 text-sm font-bold text-slate-900 text-right uppercase">
                                        {remainingInHand >= 0 ? 'Remaining In Hand' : 'Overspent Amount'}
                                    </td>
                                    <td className={`px-4 py-4 text-sm font-bold text-right ${remainingInHand >= 0 ? 'text-orange-700' : 'text-red-700'
                                        }`}>
                                        {formatCurrency(Math.abs(remainingInHand))}
                                    </td>
                                    <td colSpan="6" className="px-4 py-4"></td>
                                </tr> */}
                            </tfoot>
                        </table>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">

                    </div>
                </div>
            </div>

            <ConveyanceDetailsModal
                id={selectedPoId}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </div>
    )
}