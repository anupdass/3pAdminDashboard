import React, { useState } from 'react'
import { Plus, Calendar, User, DollarSign } from 'lucide-react'

export default function ConveyanceList() {
    const [expenses] = useState([
        {
            id: 1,
            officeExpenditure: 'Office Supplies & Stationery',
            costingAmount: 45000,
            paidAmount: 45000,
            remarks: 'Quarterly purchase',
            receivedDate: '2026-01-10',
            receivedName: 'Ahmed Rahman',
            receivedAmount: 45000
        },
        {
            id: 2,
            officeExpenditure: 'Utility Bills (Electric & Water)',
            costingAmount: 32000,
            paidAmount: 32000,
            remarks: 'December billing',
            receivedDate: '2026-01-08',
            receivedName: 'Sarah Khan',
            receivedAmount: 32000
        },
        {
            id: 3,
            officeExpenditure: 'Transportation & Fuel',
            costingAmount: 18500,
            paidAmount: 15000,
            remarks: 'Partial payment',
            receivedDate: '2026-01-12',
            receivedName: 'Rahim Ahmed',
            receivedAmount: 15000
        },
        {
            id: 4,
            officeExpenditure: 'Maintenance & Repairs',
            costingAmount: 25000,
            paidAmount: 25000,
            remarks: 'AC servicing',
            receivedDate: '2026-01-14',
            receivedName: 'Fatima Hassan',
            receivedAmount: 25000
        }
    ])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount)
    }

    const totals = expenses.reduce((acc, expense) => ({
        costingAmount: acc.costingAmount + expense.costingAmount,
        paidAmount: acc.paidAmount + expense.paidAmount,
        receivedAmount: acc.receivedAmount + expense.receivedAmount
    }), {
        costingAmount: 0,
        paidAmount: 0,
        receivedAmount: 0
    })

    const snsGlobalLimited = 150000
    const remainingInHand = snsGlobalLimited - totals.paidAmount

    const handleCreateNew = () => {
        console.log('Navigate to /create-local-purchase')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">SNS Global Expenses</h1>
                        <p className="text-slate-600 mt-1">Office expenditure tracking and management</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all shadow-md"
                    >
                        <Plus size={20} />
                        Create New
                    </button>
                </div>

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
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                        <p className="text-sm text-slate-600 mb-1">SNS Global Limited</p>
                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(snsGlobalLimited)}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
                        <p className="text-sm text-slate-600 mb-1">Remaining / Due</p>
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(remainingInHand)}</p>
                    </div>
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
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {expenses.map((expense, index) => (
                                    <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-4 text-sm text-slate-900 font-medium">{index + 1}</td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-slate-900">{expense.officeExpenditure}</div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-900 text-right font-medium">
                                            {formatCurrency(expense.costingAmount)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-green-700 text-right font-medium">
                                            {formatCurrency(expense.paidAmount)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {expense.remarks}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-slate-400" />
                                                {new Date(expense.receivedDate).toLocaleDateString('en-GB')}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <User size={14} className="text-slate-400" />
                                                {expense.receivedName}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-blue-700 text-right font-medium">
                                            {formatCurrency(expense.receivedAmount)}
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
                                </tr>

                                {/* SNS Global Limited Row */}
                                <tr className="bg-slate-100 border-t border-slate-300">
                                    <td colSpan="2" className="px-4 py-4 text-sm font-bold text-slate-900 text-right uppercase">
                                        SNS Global Limited (B)
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-purple-700 text-right">
                                        {formatCurrency(snsGlobalLimited)}
                                    </td>
                                    <td colSpan="5" className="px-4 py-4"></td>
                                </tr>

                                {/* Remaining / Due Row */}
                                <tr className="bg-gradient-to-r from-orange-50 to-orange-100 border-t border-orange-200">
                                    <td colSpan="2" className="px-4 py-4 text-sm font-bold text-slate-900 text-right uppercase">
                                        Remaining In Hand / Due Amount
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-orange-700 text-right">
                                        {formatCurrency(remainingInHand)}
                                    </td>
                                    <td colSpan="5" className="px-4 py-4"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Footer Legend */}
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <span className="text-slate-600">Paid Amount</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <span className="text-slate-600">Received Amount</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                                    <span className="text-slate-600">Due / Remaining</span>
                                </div>
                            </div>
                            <span className="text-slate-500">Last updated: {new Date().toLocaleDateString('en-GB')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}