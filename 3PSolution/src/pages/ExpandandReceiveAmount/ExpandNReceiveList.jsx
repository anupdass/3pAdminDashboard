import React, { useState } from 'react';
import { Plus, Search, TrendingUp, DollarSign, Package, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetAllExpenditureQuery } from '../../redux/features/expenditureSlice';
import ExpandDetailsModel from './ExpandDetailsModal';

const ExpandNReceiveList = () => {

    const { data: entries, isError, isLoading } = useGetAllExpenditureQuery();

    const [searchTerm, setSearchTerm] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [selectedPoId, setSelectedPoId] = useState(null);

    const handleView = (id) => {
        setSelectedPoId(id);
        setOpenModal(true);
    };

    // Fix 1: Added optional chaining and null checks
    const filteredEntries = entries?.filter(entry =>
        entry?.receivedName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Fix 2: Added null checks and default values
    const totals = filteredEntries.length > 0
        ? filteredEntries.reduce((acc, entry) => ({
            receivedAmount: acc.receivedAmount + (entry.receivedAmount || 0),
            totalAmount: acc.totalAmount + (entry.totalAmount || 0)
        }), { receivedAmount: 0, totalAmount: 0 })
        : { receivedAmount: 0, totalAmount: 0 };

    const remainingInHand = (totals?.receivedAmount || 0) - (totals?.totalAmount || 0);

    // Fix 3: Added loading and error states
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading entries...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-700 font-semibold">Error loading entries</p>
                    <p className="text-red-600 text-sm mt-2">Please try refreshing the page</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase">Total Received</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">
                                ৳ {(totals?.receivedAmount || 0).toLocaleString()}
                            </p>
                        </div>
                        <DollarSign className="text-blue-500" size={32} />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-amber-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase">Total Costing</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">
                                ৳ {(totals?.totalAmount || 0).toLocaleString()}
                            </p>
                        </div>
                        <Package className="text-amber-500" size={32} />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-emerald-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase">In Hand</p>
                            <p className={`text-2xl font-bold mt-1 ${remainingInHand >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                                ৳ {remainingInHand.toLocaleString()}
                            </p>
                        </div>
                        <TrendingUp className="text-emerald-500" size={32} />
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div>
                    {/* Search Bar - Uncomment if needed */}
                    {/* <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by received name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                    </div> */}

                    <Link
                        to="/create-expand-receive"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r my-5 from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all shadow-md"
                    >
                        <Plus size={18} />
                        Create New
                    </Link>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                {/* Main Header */}
                                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                                    <th colSpan={4} className="border border-slate-600 px-3 py-2 text-center font-bold">
                                        Received Amount
                                    </th>
                                    <th colSpan={10} className="border border-slate-600 px-3 py-2 text-center font-bold">
                                        Project Costing Calculation (SNS)
                                    </th>
                                </tr>

                                {/* Column Headers */}
                                <tr className="bg-slate-100 text-slate-700">
                                    <th className="border border-slate-300 px-2 py-2 font-semibold uppercase w-12">SL</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Received Date</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Received Name</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Received Amount</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Office Exp.</th>
                                    <th className="border border-slate-300 px-2 py-2 font-semibold uppercase">UOM</th>
                                    <th className="border border-slate-300 px-2 py-2 font-semibold uppercase">Qty</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase bg-amber-100 text-amber-800">Paid Amount</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Total Amount</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Project Local Exp.</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Conveyance</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Office Exp.</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Remarks</th>
                                    <th className="border border-slate-300 px-3 py-2 font-semibold uppercase">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEntries?.length > 0 ? (
                                    filteredEntries.map((entry, index) => (
                                        <tr key={entry._id || entry.id || index} className="hover:bg-slate-50 transition-colors">
                                            <td className="border border-slate-300 px-2 py-2 text-center font-medium text-slate-600">
                                                {index + 1}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-center text-slate-700">
                                                {/* Fix 4: Better date formatting */}
                                                {entry.receivedDate
                                                    ? new Date(entry.receivedDate).toLocaleDateString('en-GB')
                                                    : 'N/A'
                                                }
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-slate-800 font-medium">
                                                {entry.receivedName || 'N/A'}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-blue-700 font-semibold">
                                                ৳ {(entry.receivedAmount || 0).toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {(entry.officeExpenditure || 0).toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">
                                                {entry.uom || '-'}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">
                                                {entry.qty || 0}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right bg-amber-50 text-amber-800 font-semibold">
                                                ৳ {(entry.paidAmount || 0).toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-800 font-semibold">
                                                ৳ {(entry.totalAmount || 0).toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {(entry.projectLocalExp || 0).toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {(entry.conveyance || 0).toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {(entry.officeExp2 || 0).toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-slate-600">
                                                {entry.remarks || '-'}
                                            </td>

                                            <td className="border border-slate-300 px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleView(entry._id)}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                                                        title="View"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    {/* Fix 5: Pass entry ID to edit link */}
                                                    <Link
                                                        to={`/edit-expand-receive/${entry._id || entry.id}`}
                                                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        // onClick={() => handleDelete(entry._id)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14" className="border border-slate-300 px-4 py-8 text-center text-slate-500">
                                            <Package className="mx-auto mb-2 text-slate-400" size={48} />
                                            <p className="font-medium">No entries found</p>
                                            <p className="text-xs mt-1">Create your first entry to get started</p>
                                        </td>
                                    </tr>
                                )}

                                {/* Summary Rows */}
                                {filteredEntries?.length > 0 && (
                                    <>
                                        <tr className="bg-blue-50 font-bold border-t-2 border-slate-400">
                                            <td colSpan={8} className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                Total Costing Amount
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-800">
                                                ৳ {(totals?.totalAmount || 0).toLocaleString()}
                                            </td>
                                            <td colSpan={5} className="border border-slate-300"></td>
                                        </tr>

                                        <tr className="bg-emerald-50 font-bold">
                                            <td colSpan={8} className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                Total Received Amount
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-emerald-700">
                                                ৳ {(totals?.receivedAmount || 0).toLocaleString()}
                                            </td>
                                            <td colSpan={5} className="border border-slate-300"></td>
                                        </tr>

                                        <tr className="bg-amber-50 font-bold border-b-2 border-slate-400">
                                            <td colSpan={8} className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                Remaining In Hand
                                            </td>
                                            <td className={`border border-slate-300 px-3 py-2 text-right font-bold ${remainingInHand >= 0 ? 'text-emerald-700' : 'text-red-700'
                                                }`}>
                                                ৳ {remainingInHand.toLocaleString()}
                                            </td>
                                            <td colSpan={5} className="border border-slate-300"></td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredEntries?.length > 0 && (
                        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Showing <span className="font-semibold">{filteredEntries.length}</span> of <span className="font-semibold">{entries?.length || 0}</span> entries
                            </p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm border border-slate-300 text-slate-700 rounded hover:bg-slate-100 transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1 text-sm border border-slate-300 text-slate-700 rounded hover:bg-slate-100 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ExpandDetailsModel
                id={selectedPoId}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />

        </div>
    );
};

export default ExpandNReceiveList;