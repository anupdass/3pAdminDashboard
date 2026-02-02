import React, { useEffect, useState } from 'react'
import { DollarSign, Calendar, User, FileText } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetConveyanceByIdQuery,
    useUpdateConveyanceMutation
} from '../../redux/features/conveyanceSlice'

export default function UpdateExpenseForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data } = useGetConveyanceByIdQuery(id, {
        refetchOnMountOrArgChange: true,
    });

    const [updateConveyance, { isLoading }] = useUpdateConveyanceMutation()

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

    /* ---------------- PREFILL ---------------- */
    useEffect(() => {
        if (data) {
            setFormData({
                officeExpenditure: data.officeExpenditure || '',
                costingAmount: data.costingAmount || '',
                paidAmount: data.paidAmount || '',
                remarks: data.remarks || '',
                receivedDate: data.receivedDate
                    ? data.receivedDate.split('T')[0]
                    : '',
                receivedName: data.receivedName || '',
                receivedAmount: data.receivedAmount || ''
            })
        }
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
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

    /* ---------------- UPDATE SUBMIT ---------------- */
    const handleSubmit = async () => {
        if (!validateForm()) return

        try {
            await updateConveyance({
                id,
                officeExpenditure: formData.officeExpenditure.trim(),
                costingAmount: parseFloat(formData.costingAmount),
                paidAmount: parseFloat(formData.paidAmount),
                remarks: formData.remarks.trim() || '',
                receivedDate: formData.receivedDate || null,
                receivedName: formData.receivedName.trim() || '',
                receivedAmount: formData.receivedAmount
                    ? parseFloat(formData.receivedAmount)
                    : 0
            }).unwrap()

            navigate('/conveyance-list')
        } catch (error) {
            console.error('Failed to update conveyance:', error)
        }
    }

    const handleReset = () => navigate('/conveyance-list')

    const calculateDueAmount = () => {
        const costing = parseFloat(formData.costingAmount) || 0
        const paid = parseFloat(formData.paidAmount) || 0
        return costing - paid
    }

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-5">
                        <div className="space-y-4">
                            {/* Office Expenditure */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    <div className="flex items-center gap-1.5">
                                        <FileText size={14} className="text-slate-500" />
                                        Office Expenditure *
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    name="officeExpenditure"
                                    value={formData.officeExpenditure}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.officeExpenditure ? 'border-red-500' : 'border-slate-300'
                                        } ${isLoading ? 'bg-slate-50 cursor-not-allowed' : ''}`}
                                    placeholder="e.g., Office Supplies & Stationery"
                                />
                                {errors.officeExpenditure && (
                                    <p className="mt-1 text-xs text-red-600">{errors.officeExpenditure}</p>
                                )}
                            </div>

                            {/* Amount Section */}
                            <div className="border-t border-slate-200 pt-4">
                                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                                    <DollarSign size={16} className="text-slate-600" />
                                    Amount Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Costing Amount (BDT) *
                                        </label>
                                        <input
                                            type="number"
                                            name="costingAmount"
                                            value={formData.costingAmount}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.costingAmount ? 'border-red-500' : 'border-slate-300'
                                                } ${isLoading ? 'bg-slate-50 cursor-not-allowed' : ''}`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        {errors.costingAmount && (
                                            <p className="mt-1 text-xs text-red-600">{errors.costingAmount}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            Paid Amount (BDT) *
                                        </label>
                                        <input
                                            type="number"
                                            name="paidAmount"
                                            value={formData.paidAmount}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${errors.paidAmount ? 'border-red-500' : 'border-slate-300'
                                                } ${isLoading ? 'bg-slate-50 cursor-not-allowed' : ''}`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        {errors.paidAmount && (
                                            <p className="mt-1 text-xs text-red-600">{errors.paidAmount}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Remarks */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    Remarks
                                </label>
                                <textarea
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    rows="2"
                                    className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${isLoading ? 'bg-slate-50 cursor-not-allowed' : ''
                                        }`}
                                    placeholder="Add any additional notes or remarks"
                                />
                            </div>

                            {/* Received Information Section */}
                            <div className="border-t border-slate-200 pt-4">
                                <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                                    <User size={16} className="text-slate-600" />
                                    Received Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-slate-500" />
                                                Received Date
                                            </div>
                                        </label>
                                        <input
                                            type="date"
                                            name="receivedDate"
                                            value={formData.receivedDate}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${isLoading ? 'bg-slate-50 cursor-not-allowed' : ''
                                                }`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <User size={12} className="text-slate-500" />
                                                Received Name
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            name="receivedName"
                                            value={formData.receivedName}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className={`w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${isLoading ? 'bg-slate-50 cursor-not-allowed' : ''
                                                }`}
                                            placeholder="Enter recipient name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign size={12} className="text-slate-500" />
                                                Received Amount (BDT)
                                            </div>
                                        </label>
                                        <input
                                            type="number"
                                            name="receivedAmount"
                                            value={formData.receivedAmount}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.receivedAmount ? 'border-red-500' : 'border-slate-300'
                                                } ${isLoading ? 'bg-slate-50 cursor-not-allowed' : ''}`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                        {errors.receivedAmount && (
                                            <p className="mt-1 text-xs text-red-600">{errors.receivedAmount}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Summary Section */}
                            {formData.costingAmount && (
                                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Summary</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <p className="text-[10px] text-slate-500 uppercase mb-0.5">Costing Amount</p>
                                            <p className="text-base font-bold text-blue-600">{formatCurrency(parseFloat(formData.costingAmount))}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <p className="text-[10px] text-slate-500 uppercase mb-0.5">Paid Amount</p>
                                            <p className="text-base font-bold text-green-600">{formatCurrency(parseFloat(formData.paidAmount) || 0)}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <p className="text-[10px] text-slate-500 uppercase mb-0.5">Due Amount</p>
                                            <p className="text-base font-bold text-red-600">{formatCurrency(calculateDueAmount())}</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <p className="text-[10px] text-slate-500 uppercase mb-0.5">Received Amount</p>
                                            <p className="text-base font-bold text-purple-600">{formatCurrency(parseFloat(formData.receivedAmount) || 0)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-5 pt-4 border-t border-slate-200 justify-end">
                            <button
                                onClick={handleReset}
                                disabled={isLoading}
                                className={`bg-white border-2 border-slate-300 text-slate-700 font-medium text-sm py-1.5 px-4 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-sm py-1.5 px-5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Updating...
                                    </span>
                                ) : (
                                    'Update Conveyance'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
