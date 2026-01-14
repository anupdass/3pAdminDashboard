import React, { useState } from 'react';
import { Plus, Search, FileText, Edit, Trash2, Eye } from 'lucide-react';
import CustomButton from '../../components/CustomButton';
import ButtonForNavigate from '../../components/ButtonForNavigate';

const SEList = () => {
    // Sample data - replace with your actual data
    const [entries, setEntries] = useState([
        {
            id: 1,
            projectName: 'Website Redesign',
            description: 'Complete redesign of company website',
            costing: 150000,
            bcbl: 100000,
            cash: 30000,
            remarks: 'Phase 1 completed'
        },
        {
            id: 2,
            projectName: 'Mobile App Development',
            description: 'iOS and Android app development',
            costing: 250000,
            bcbl: 150000,
            cash: 50000,
            remarks: 'In progress'
        },
        {
            id: 3,
            projectName: 'Cloud Migration',
            description: 'AWS cloud infrastructure setup',
            costing: 180000,
            bcbl: 180000,
            cash: 0,
            remarks: 'Completed'
        }
    ]);


    const calculatePaymentDue = (costing, bcbl, cash) => {
        return costing - bcbl - cash;
    };


    const totals = entries.reduce((acc, entry) => ({
        costing: acc.costing + entry.costing,
        bcbl: acc.bcbl + entry.bcbl,
        cash: acc.cash + entry.cash
    }), { costing: 0, bcbl: 0, cash: 0 });

    const totalPaymentDue = totals.costing - totals.bcbl - totals.cash;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full">

                <ButtonForNavigate btnText='Create New' navigate='/create-se' />

                {/* Table Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-100 border-b-2 border-slate-300">
                                    <th className="px-3 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider w-16">
                                        SL
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                        Project Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-red-600 uppercase tracking-wider">
                                        Costing
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                        BCBL
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                        Cash
                                    </th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                                        Due
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                        Remarks
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {entries.length > 0 ? (
                                    entries.map((entry, index) => {
                                        const paymentDue = calculatePaymentDue(entry.costing, entry.bcbl, entry.cash);
                                        return (
                                            <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-3 py-3 text-center text-slate-600 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-3 text-slate-800 font-medium">
                                                    {entry.projectName}
                                                </td>
                                                <td className="px-4 py-3 text-slate-600">
                                                    {entry.description}
                                                </td>
                                                <td className="px-4 py-3 text-right text-red-700 font-semibold">
                                                    ৳ {entry.costing.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-right text-slate-700">
                                                    ৳ {entry.bcbl.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-right text-slate-700">
                                                    ৳ {entry.cash.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <span className={`inline-block px-2 py-1 rounded font-semibold ${paymentDue > 0 ? 'bg-red-100 text-red-700' :
                                                        paymentDue < 0 ? 'bg-amber-100 text-amber-700' :
                                                            'bg-emerald-100 text-emerald-700'
                                                        }`}>
                                                        ৳ {paymentDue.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-slate-600">
                                                    {entry.remarks}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                            title="View"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="px-4 py-8 text-center text-slate-500">
                                            <FileText className="mx-auto mb-2 text-slate-400" size={48} />
                                            <p className="font-medium">No entries found</p>
                                            <p className="text-sm mt-1">Create your first service entry to get started</p>
                                        </td>
                                    </tr>
                                )}

                                {/* Totals Row */}
                                {entries.length > 0 && (
                                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                                        <td colSpan="3" className="px-4 py-3 text-right text-slate-700">
                                            Total:
                                        </td>
                                        <td className="px-4 py-3 text-right text-red-700">
                                            ৳ {totals.costing.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right text-slate-700">
                                            ৳ {totals.bcbl.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right text-slate-700">
                                            ৳ {totals.cash.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={`inline-block px-2 py-1 rounded ${totalPaymentDue > 0 ? 'bg-red-200 text-red-800' :
                                                totalPaymentDue < 0 ? 'bg-amber-200 text-amber-800' :
                                                    'bg-emerald-200 text-emerald-800'
                                                }`}>
                                                ৳ {totalPaymentDue.toLocaleString()}
                                            </span>
                                        </td>
                                        <td colSpan="2"></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination - Optional */}
                    {entries.length > 0 && (
                        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Showing <span className="font-semibold">{entries.length}</span> of <span className="font-semibold">{entries.length}</span> entries
                            </p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 text-sm border border-slate-300 text-slate-700 rounded hover:bg-slate-100 transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
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

export default SEList;