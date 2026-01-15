import React, { useState } from 'react'

export default function CreateLocalPurchase() {
    const [formData, setFormData] = useState({
        projectName: '',
        date: '',
        description: '',
        requisitionAmount: '',
        paidSNS: '',
        paidMWTIL: '',
        pettyCash: ''
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

        if (!formData.projectName.trim()) {
            newErrors.projectName = 'Project name is required'
        }

        if (!formData.date) {
            newErrors.date = 'Date is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        if (!formData.requisitionAmount || parseFloat(formData.requisitionAmount) <= 0) {
            newErrors.requisitionAmount = 'Valid requisition amount is required'
        }

        const requisition = parseFloat(formData.requisitionAmount) || 0
        const paidSNS = parseFloat(formData.paidSNS) || 0
        const paidMWTIL = parseFloat(formData.paidMWTIL) || 0
        const pettyCash = parseFloat(formData.pettyCash) || 0
        const totalPaid = paidSNS + paidMWTIL + pettyCash

        if (totalPaid > requisition) {
            newErrors.paidSNS = 'Total paid amount cannot exceed requisition amount'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (validateForm()) {
            console.log('Form submitted:', formData)
            setShowSuccess(true)

            setFormData({
                projectName: '',
                date: '',
                description: '',
                requisitionAmount: '',
                paidSNS: '',
                paidMWTIL: '',
                pettyCash: ''
            })

            setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        }
    }

    const handleReset = () => {
        setFormData({
            projectName: '',
            date: '',
            description: '',
            requisitionAmount: '',
            paidSNS: '',
            paidMWTIL: '',
            pettyCash: ''
        })
        setErrors({})
        setShowSuccess(false)
    }

    const calculateDue = () => {
        const requisition = parseFloat(formData.requisitionAmount) || 0
        const paidSNS = parseFloat(formData.paidSNS) || 0
        const paidMWTIL = parseFloat(formData.paidMWTIL) || 0
        const pettyCash = parseFloat(formData.pettyCash) || 0
        const due = requisition - paidSNS - paidMWTIL - pettyCash
        return due > 0 ? due : 0
    }

    const calculateTotalCosting = () => {
        const paidSNS = parseFloat(formData.paidSNS) || 0
        const paidMWTIL = parseFloat(formData.paidMWTIL) || 0
        const pettyCash = parseFloat(formData.pettyCash) || 0
        return paidSNS + paidMWTIL + pettyCash
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
                                    Purchase record created successfully!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                        <h1 className="text-3xl font-bold text-white text-center">
                            Create Local Purchase
                        </h1>
                        <p className="text-blue-100 text-center mt-2">Add new project purchase record</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Project Name *
                                </label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.projectName ? 'border-red-500' : 'border-slate-300'
                                        }`}
                                    placeholder="Enter project name"
                                />
                                {errors.projectName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.projectName}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.date ? 'border-red-500' : 'border-slate-300'
                                            }`}
                                    />
                                    {errors.date && (
                                        <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Requisition Amount (BDT) *
                                    </label>
                                    <input
                                        type="number"
                                        name="requisitionAmount"
                                        value={formData.requisitionAmount}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.requisitionAmount ? 'border-red-500' : 'border-slate-300'
                                            }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors.requisitionAmount && (
                                        <p className="mt-1 text-sm text-red-600">{errors.requisitionAmount}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${errors.description ? 'border-red-500' : 'border-slate-300'
                                        }`}
                                    placeholder="Enter purchase description"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Paid Amount - SNS (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            name="paidSNS"
                                            value={formData.paidSNS}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${errors.paidSNS ? 'border-red-500' : 'border-slate-300'
                                                }`}
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Paid Amount - MWTIL (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            name="paidMWTIL"
                                            value={formData.paidMWTIL}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Petty Cash (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            name="pettyCash"
                                            value={formData.pettyCash}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="0.00"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                {errors.paidSNS && (
                                    <p className="mt-2 text-sm text-red-600">{errors.paidSNS}</p>
                                )}
                            </div>

                            {formData.requisitionAmount && (
                                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Summary</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-xs text-slate-500 uppercase mb-1">Total Costing</p>
                                            <p className="text-lg font-bold text-slate-900">{formatCurrency(calculateTotalCosting())}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <p className="text-xs text-slate-500 uppercase mb-1">Due Amount</p>
                                            <p className="text-lg font-bold text-red-600">{formatCurrency(calculateDue())}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm col-span-2 md:col-span-1">
                                            <p className="text-xs text-slate-500 uppercase mb-1">Requisition</p>
                                            <p className="text-lg font-bold text-blue-600">{formatCurrency(parseFloat(formData.requisitionAmount))}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all shadow-md"
                            >
                                Create Purchase
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

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        * Required fields | All amounts in Bangladesh Taka (BDT)
                    </p>
                </div>
            </div>
        </div>
    )
}