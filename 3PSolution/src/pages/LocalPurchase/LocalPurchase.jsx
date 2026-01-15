import React, { useState } from 'react'
import ButtonForNavigate from '../../components/ButtonForNavigate'

export default function LocalPurchase() {
    const [purchases, setPurchases] = useState([
        {
            id: 1,
            projectName: 'Metro Rail Extension',
            date: '2026-01-10',
            description: 'Construction materials and equipment',
            requisitionAmount: 250000,
            paidSNS: 150000,
            paidMWTIL: 50000,
            pettyCash: 5000,
            totalCosting: 205000
        },
        {
            id: 2,
            projectName: 'Highway Bridge Project',
            date: '2026-01-12',
            description: 'Steel reinforcement bars',
            requisitionAmount: 180000,
            paidSNS: 180000,
            paidMWTIL: 0,
            pettyCash: 0,
            totalCosting: 180000
        },
        {
            id: 3,
            projectName: 'Smart City Infrastructure',
            date: '2026-01-14',
            description: 'Electrical components',
            requisitionAmount: 95000,
            paidSNS: 60000,
            paidMWTIL: 20000,
            pettyCash: 2000,
            totalCosting: 82000
        }
    ])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount)
    }

    const calculateDue = (requisition, paid, petty) => {
        const due = requisition - paid - petty
        return due > 0 ? due : 0
    }

    const totals = purchases.reduce((acc, purchase) => ({
        requisitionAmount: acc.requisitionAmount + purchase.requisitionAmount,
        paidSNS: acc.paidSNS + purchase.paidSNS,
        paidMWTIL: acc.paidMWTIL + purchase.paidMWTIL,
        pettyCash: acc.pettyCash + purchase.pettyCash,
        totalCosting: acc.totalCosting + purchase.totalCosting,
        dueAmount: acc.dueAmount + calculateDue(purchase.requisitionAmount, purchase.paidSNS + purchase.paidMWTIL, purchase.pettyCash)
    }), {
        requisitionAmount: 0,
        paidSNS: 0,
        paidMWTIL: 0,
        pettyCash: 0,
        totalCosting: 0,
        dueAmount: 0
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">

            <ButtonForNavigate btnText='Create New' navigate='/create-local-purchase' />

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                        <h1 className="text-3xl font-bold text-white text-center">
                            Project Wise Local Purchases
                        </h1>
                        <p className="text-blue-100 text-center mt-2">Financial Overview & Tracking</p>
                    </div>

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
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Due</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">Total Costing</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {purchases.map((purchase, index) => {
                                    const dueAmount = calculateDue(
                                        purchase.requisitionAmount,
                                        purchase.paidSNS + purchase.paidMWTIL,
                                        purchase.pettyCash
                                    )

                                    return (
                                        <tr key={purchase.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-4 text-sm text-slate-900 font-medium">{index + 1}</td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm font-medium text-slate-900">{purchase.projectName}</div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600">
                                                {new Date(purchase.date).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600 max-w-xs">
                                                {purchase.description}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-900 text-right font-medium">
                                                {formatCurrency(purchase.requisitionAmount)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-green-700 text-right font-medium">
                                                {formatCurrency(purchase.paidSNS)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-green-700 text-right font-medium">
                                                {formatCurrency(purchase.paidMWTIL)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-blue-700 text-right font-medium">
                                                {formatCurrency(purchase.pettyCash)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-right font-semibold">
                                                {dueAmount > 0 ? (
                                                    <span className="text-red-600">{formatCurrency(dueAmount)}</span>
                                                ) : (
                                                    <span className="text-slate-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-900 text-right font-semibold">
                                                {formatCurrency(purchase.totalCosting)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                            <tfoot>
                                <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-t-2 border-slate-300 font-semibold">
                                    <td colSpan="4" className="px-4 py-4 text-sm text-slate-900 uppercase">Total</td>
                                    <td className="px-4 py-4 text-sm text-slate-900 text-right">{formatCurrency(totals.requisitionAmount)}</td>
                                    <td className="px-4 py-4 text-sm text-green-800 text-right">{formatCurrency(totals.paidSNS)}</td>
                                    <td className="px-4 py-4 text-sm text-green-800 text-right">{formatCurrency(totals.paidMWTIL)}</td>
                                    <td className="px-4 py-4 text-sm text-blue-800 text-right">{formatCurrency(totals.pettyCash)}</td>
                                    <td className="px-4 py-4 text-sm text-red-700 text-right">{formatCurrency(totals.dueAmount)}</td>
                                    <td className="px-4 py-4 text-sm text-slate-900 text-right">{formatCurrency(totals.totalCosting)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <span className="text-slate-600">Paid Amount</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                    <span className="text-slate-600">Due Amount</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <span className="text-slate-600">Petty Cash</span>
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