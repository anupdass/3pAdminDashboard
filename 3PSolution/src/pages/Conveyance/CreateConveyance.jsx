import React, { useState } from 'react'
import { DollarSign, Calendar, User, FileText } from 'lucide-react'

export default function CreateExpenseForm() {
    const [formData, setFormData] = useState({
        officeExpenditure: '',
        costingAmount: '',
        paidAmount: '',
        remarks: '',
        receivedDate: '',
        receivedName: '',
        receivedAmount: ''
    })

    const [errors, setErrors] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.officeExpenditure.trim()) {
            newErrors.officeExpenditure = 'Office expenditure description is required'
        }

        if (!formData.costingAmount || parseFloat(formData.costingAmount) <= 0) {
            newErrors.costingAmount = 'Valid costing amount is required'
        }

        if (!formData.paidAmount || parseFloat(formData.paidAmount) < 0) {
            newErrors.paidAmount = 'Valid paid amount is required'
        }

        const costing = parseFloat(formData.costingAmount) || 0
        const paid = parseFloat(formData.paidAmount) || 0

        if (paid > costing) {
            newErrors.paidAmount = 'Paid amount cannot exceed costing amount'
        }

        if (formData.receivedAmount && parseFloat(formData.receivedAmount) < 0) {
            newErrors.receivedAmount = 'Received amount must be valid'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form submitted:', formData)
            setShowSuccess(true)

            setFormData({
                officeExpenditure: '',
                costingAmount: '',
                paidAmount: '',
                remarks: '',
                receivedDate: '',
                receivedName: '',
                receivedAmount: ''
            })

            setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        }
    }

    const handleReset = () => {
        setFormData({
            officeExpenditure: '',
            costingAmount: '',
            paidAmount: '',
            remarks: '',
            receivedDate: '',
            receivedName: '',
            receivedAmount: ''
        })
        setErrors({})
        setShowSuccess(false)
    }

    const calculateDueAmount = () => {
        const costing = parseFloat(formData.costingAmount) || 0
        const paid = parseFloat(formData.paidAmount) || 0
        return costing - paid
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className=" mx-auto">
                {showSuccess && (
                    <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    Expense record created successfully!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                        <h1 className="text-3xl font-bold text-white text-center">
                            Create SNS Global Expense
                        </h1>
                        <p className="text-blue-100 text-center mt-2">Add new office expenditure record</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            {/* Office Expenditure */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FileText size={16} className="text-slate-500" />
                                        Office Expenditure *
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    name="officeExpenditure"
                                    value={formData.officeExpenditure}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.officeExpenditure ? 'border-red-500' : 'border-slate-300'
                                        }`}
                                    placeholder="e.g., Office Supplies & Stationery"
                                />
                                {errors.officeExpenditure && (
                                    <p className="mt-1 text-sm text-red-600">{errors.officeExpenditure}</p>
                                )}
                            </div>

                            {/* Amount Section */}
                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <DollarSign size={20} className="text-slate-600" />
                                    Amount Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Costing Amount (BDT) *
                                        </label>
                                        <input
                                            type="number"
                                            name="costingAmount"
                                            value={formData.costingAmount}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.costingAmount ? 'border-red-500' : 'border-slate-300'
                                                }`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        {errors.costingAmount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.costingAmount}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Paid Amount (BDT) *
                                        </label>
                                        <input
                                            type="number"
                                            name="paidAmount"
                                            value={formData.paidAmount}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${errors.paidAmount ? 'border-red-500' : 'border-slate-300'
                                                }`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        {errors.paidAmount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.paidAmount}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Remarks */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Remarks
                                </label>
                                <textarea
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                    placeholder="Add any additional notes or remarks"
                                />
                            </div>

                            {/* Received Information Section */}
                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <User size={20} className="text-slate-600" />
                                    Received Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-slate-500" />
                                                Received Date
                                            </div>
                                        </label>
                                        <input
                                            type="date"
                                            name="receivedDate"
                                            value={formData.receivedDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            <div className="flex items-center gap-2">
                                                <User size={14} className="text-slate-500" />
                                                Received Name
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            name="receivedName"
                                            value={formData.receivedName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Enter recipient name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            <div className="flex items-center gap-2">
                                                <DollarSign size={14} className="text-slate-500" />
                                                Received Amount (BDT)
                                            </div>
                                        </label>
                                        <input
                                            type="number"
                                            name="receivedAmount"
                                            value={formData.receivedAmount}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.receivedAmount ? 'border-red-500' : 'border-slate-300'
                                                }`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        {errors.receivedAmount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.receivedAmount}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Summary Section */}
                            {formData.costingAmount && (
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Summary</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-xs text-slate-500 uppercase mb-1">Costing Amount</p>
                                            <p className="text-lg font-bold text-blue-600">{formatCurrency(parseFloat(formData.costingAmount))}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-xs text-slate-500 uppercase mb-1">Paid Amount</p>
                                            <p className="text-lg font-bold text-green-600">{formatCurrency(parseFloat(formData.paidAmount) || 0)}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-xs text-slate-500 uppercase mb-1">Due Amount</p>
                                            <p className="text-lg font-bold text-red-600">{formatCurrency(calculateDueAmount())}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-xs text-slate-500 uppercase mb-1">Received Amount</p>
                                            <p className="text-lg font-bold text-purple-600">{formatCurrency(parseFloat(formData.receivedAmount) || 0)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all shadow-md"
                            >
                                Create Expense
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg hover:bg-slate-300 focus:ring-4 focus:ring-slate-200 transition-all"
                            >
                                Reset Form
                            </button>
                        </div>
                    </div>
                </div>

                {/* Helper Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        * Required fields | All amounts in Bangladesh Taka (BDT)
                    </p>
                </div>
            </div>
        </div>
    )
}