import React, { useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import ButtonForNavigate from '../../components/ButtonForNavigate';
import { useNavigate } from 'react-router-dom';
import { useGetAllLocalPurchaseQuery } from '../../redux/features/locapurchaseSlice';
import ExpenditureDetailsModal from './LocalpurchaseDetailsModal';



export default function LocalPurchase() {
    const { data: purchases, isLoading, isError } = useGetAllLocalPurchaseQuery();
    const [openModal, setOpenModal] = useState(false);
    const [selectedPoId, setSelectedPoId] = useState(null);

    const navigate = useNavigate();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this purchase?')) {
            try {
                await deleteLocalPurchase(id).unwrap();
            } catch (err) {
                console.error('Error deleting purchase:', err);
                alert(`Error: ${err?.data?.message || 'Failed to delete purchase'}`);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-local-purchase/${id}`);
    };

    const handleView = (id) => {
        setSelectedPoId(id);
        setOpenModal(true);
    };
    // Calculate totals
    const totals = purchases?.reduce((acc, purchase) => ({
        requisitionAmount: acc.requisitionAmount + (purchase.requisitionAmount || 0),
        paidSNS: acc.paidSNS + (purchase.paidSNS || 0),
        paidMWTIL: acc.paidMWTIL + (purchase.paidMWTIL || 0),
        pettyCash: acc.pettyCash + (purchase.pettyCash || 0),
        totalCosting: acc.totalCosting + (purchase.totalPaid || 0),
        dueAmount: acc.dueAmount + (purchase.dueAmount || 0)
    }), {
        requisitionAmount: 0,
        paidSNS: 0,
        paidMWTIL: 0,
        pettyCash: 0,
        totalCosting: 0,
        dueAmount: 0
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading purchases...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Data</h2>
                        <p className="text-red-600">Failed to load purchases</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <ButtonForNavigate btnText='Create New' navigate='/create-local-purchase' />

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-100 border-b-2 border-slate-300">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">SL</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Project Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Description</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Requisition</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">SNS</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">MWTIL</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Petty Cash</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Total Paid</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Due</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {purchases?.length === 0 ? (
                                    <tr>
                                        <td colSpan="11" className="px-4 py-8 text-center text-slate-500">
                                            No purchases found. Create your first purchase record.
                                        </td>
                                    </tr>
                                ) : (
                                    purchases?.map((purchase, index) => (
                                        <tr key={purchase._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 text-sm text-slate-900 font-medium">{index + 1}</td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm font-medium text-slate-900">{purchase.projectName}</div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600">
                                                {formatDate(purchase.date)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600 max-w-xs">
                                                <div className="truncate" title={purchase.description}>
                                                    {purchase.description}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-900 text-right font-medium">
                                                {formatCurrency(purchase.requisitionAmount)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-green-700 text-right font-medium">
                                                {formatCurrency(purchase.paidSNS)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-green-700 text-right font-medium">
                                                {formatCurrency(purchase.paidMWTIL)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-blue-700 text-right font-medium">
                                                {formatCurrency(purchase.pettyCash)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-emerald-700 text-right font-semibold">
                                                {formatCurrency(purchase.totalPaid || 0)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-right font-semibold">
                                                {purchase.dueAmount > 0 ? (
                                                    <span className="text-red-600">{formatCurrency(purchase.dueAmount)}</span>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleView(purchase._id)}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(purchase._id)}
                                                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(purchase._id)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>

                            {purchases?.length > 0 && (
                                <tfoot>
                                    <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-t-2 border-slate-300 font-semibold">
                                        <td colSpan="4" className="px-4 py-4 text-sm text-slate-900 uppercase">Total</td>
                                        <td className="px-4 py-4 text-sm text-slate-900 text-right">{formatCurrency(totals?.requisitionAmount)}</td>
                                        <td className="px-4 py-4 text-sm text-green-800 text-right">{formatCurrency(totals?.paidSNS)}</td>
                                        <td className="px-4 py-4 text-sm text-green-800 text-right">{formatCurrency(totals?.paidMWTIL)}</td>
                                        <td className="px-4 py-4 text-sm text-blue-800 text-right">{formatCurrency(totals?.pettyCash)}</td>
                                        <td className="px-4 py-4 text-sm text-emerald-800 text-right">{formatCurrency(totals?.totalCosting)}</td>
                                        <td className="px-4 py-4 text-sm text-red-700 text-right">{formatCurrency(totals?.dueAmount)}</td>
                                        <td className="px-4 py-4"></td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
            </div>

            <ExpenditureDetailsModal
                id={selectedPoId}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
}