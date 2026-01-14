import React, { useState } from 'react';
import { Plus, Search, TrendingUp, DollarSign, Package } from 'lucide-react';

const ExpandNReceiveList = () => {
    const [entries, setEntries] = useState([
        {
            id: 1,
            receivedDate: '2025-01-10',
            receivedName: 'Project Alpha Payment',
            receivedAmount: 500000,
            officeExpenditure: 50000,
            uom: 'pcs',
            qty: 100,
            paidAmount: 250000,
            totalAmount: 450000,
            projectLocalExp: 150000,
            conveyance: 30000,
            officeExp2: 20000,
            remarks: 'Initial payment'
        },
        {
            id: 2,
            receivedDate: '2025-01-12',
            receivedName: 'Project Beta Advance',
            receivedAmount: 300000,
            officeExpenditure: 30000,
            uom: 'lot',
            qty: 5,
            paidAmount: 150000,
            totalAmount: 270000,
            projectLocalExp: 100000,
            conveyance: 15000,
            officeExp2: 5000,
            remarks: 'Phase 1'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredEntries = entries.filter(entry =>
        entry.receivedName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totals = filteredEntries.reduce((acc, entry) => ({
        receivedAmount: acc.receivedAmount + entry.receivedAmount,
        totalAmount: acc.totalAmount + entry.totalAmount
    }), { receivedAmount: 0, totalAmount: 0 });

    const remainingInHand = totals.receivedAmount - totals.totalAmount;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="text-emerald-600" size={24} />
                                Expand & Receive List
                            </h1>
                            <p className="text-sm text-slate-500 mt-1">Project costing calculation (SNS)</p>
                        </div>

                        <button
                            onClick={() => window.location.href = '/create-expand-receive'}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all shadow-md"
                        >
                            <Plus size={18} />
                            Create New
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by received name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Total Received</p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">৳ {totals.receivedAmount.toLocaleString()}</p>
                            </div>
                            <DollarSign className="text-blue-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-amber-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">Total Costing</p>
                                <p className="text-2xl font-bold text-slate-800 mt-1">৳ {totals.totalAmount.toLocaleString()}</p>
                            </div>
                            <Package className="text-amber-500" size={32} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-emerald-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 font-semibold uppercase">In Hand</p>
                                <p className={`text-2xl font-bold mt-1 ${remainingInHand >= 0 ? 'text-emerald-700' : 'text-red-700'
                                    }`}>৳ {remainingInHand.toLocaleString()}</p>
                            </div>
                            <TrendingUp className="text-emerald-500" size={32} />
                        </div>
                    </div>
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
                                    <th colSpan={9} className="border border-slate-600 px-3 py-2 text-center font-bold">
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
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEntries.length > 0 ? (
                                    filteredEntries.map((entry, index) => (
                                        <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="border border-slate-300 px-2 py-2 text-center font-medium text-slate-600">
                                                {index + 1}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-center text-slate-700">
                                                {entry.receivedDate}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-slate-800 font-medium">
                                                {entry.receivedName}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-blue-700 font-semibold">
                                                ৳ {entry.receivedAmount.toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {entry.officeExpenditure.toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">
                                                {entry.uom}
                                            </td>
                                            <td className="border border-slate-300 px-2 py-2 text-center text-slate-700">
                                                {entry.qty}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right bg-amber-50 text-amber-800 font-semibold">
                                                ৳ {entry.paidAmount.toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-800 font-semibold">
                                                ৳ {entry.totalAmount.toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {entry.projectLocalExp.toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {entry.conveyance.toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                ৳ {entry.officeExp2.toLocaleString()}
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-slate-600">
                                                {entry.remarks}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="13" className="border border-slate-300 px-4 py-8 text-center text-slate-500">
                                            <Package className="mx-auto mb-2 text-slate-400" size={48} />
                                            <p className="font-medium">No entries found</p>
                                            <p className="text-xs mt-1">Create your first entry to get started</p>
                                        </td>
                                    </tr>
                                )}

                                {/* Summary Rows */}
                                {filteredEntries.length > 0 && (
                                    <>
                                        <tr className="bg-blue-50 font-bold border-t-2 border-slate-400">
                                            <td colSpan={8} className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                Total Costing Amount
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-slate-800">
                                                ৳ {totals.totalAmount.toLocaleString()}
                                            </td>
                                            <td colSpan={4} className="border border-slate-300"></td>
                                        </tr>
                                        <tr className="bg-emerald-50 font-bold">
                                            <td colSpan={8} className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                Total Received Amount
                                            </td>
                                            <td className="border border-slate-300 px-3 py-2 text-right text-emerald-700">
                                                ৳ {totals.receivedAmount.toLocaleString()}
                                            </td>
                                            <td colSpan={4} className="border border-slate-300"></td>
                                        </tr>
                                        <tr className="bg-amber-50 font-bold border-b-2 border-slate-400">
                                            <td colSpan={8} className="border border-slate-300 px-3 py-2 text-right text-slate-700">
                                                Remaining In Hand
                                            </td>
                                            <td className={`border border-slate-300 px-3 py-2 text-right font-bold ${remainingInHand >= 0 ? 'text-emerald-700' : 'text-red-700'
                                                }`}>
                                                ৳ {remainingInHand.toLocaleString()}
                                            </td>
                                            <td colSpan={4} className="border border-slate-300"></td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredEntries.length > 0 && (
                        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Showing <span className="font-semibold">{filteredEntries.length}</span> of <span className="font-semibold">{entries.length}</span> entries
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
        </div>
    );
};

export default ExpandNReceiveList;