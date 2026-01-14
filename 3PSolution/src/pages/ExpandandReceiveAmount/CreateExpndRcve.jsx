import React, { useState } from 'react';
import { Save, X, DollarSign, Package, Calendar, FileText, TrendingUp } from 'lucide-react';

const CreateExpandReceive = () => {
    const [formData, setFormData] = useState({
        receivedDate: '',
        receivedName: '',
        receivedAmount: '',
        officeExpenditure: '',
        uom: '',
        qty: '',
        paidAmount: '',
        projectLocalExp: '',
        conveyance: '',
        officeExp2: '',
        remarks: ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const calculateTotalAmount = () => {
        const paid = parseFloat(formData.paidAmount) || 0;
        const local = parseFloat(formData.projectLocalExp) || 0;
        const conv = parseFloat(formData.conveyance) || 0;
        const office = parseFloat(formData.officeExp2) || 0;
        return paid + local + conv + office;
    };

    const calculateRemaining = () => {
        const received = parseFloat(formData.receivedAmount) || 0;
        const total = calculateTotalAmount();
        return received - total;
    };

    const totalAmount = calculateTotalAmount();
    const remainingInHand = calculateRemaining();

    const handleSubmit = () => {
        console.log('Form submitted:', { ...formData, totalAmount });
        // Add your submit logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3">
                        <h1 className="text-xl font-bold text-white">Create Expand & Receive Entry</h1>
                        <p className="text-emerald-100 text-xs mt-1">Project costing calculation form</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-4 space-y-4">
                        {/* Received Amount Section */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h2 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                                <DollarSign size={16} />
                                Received Amount Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {/* Received Date */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Calendar size={14} className="text-blue-600" />
                                        Received Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.receivedDate}
                                        onChange={(e) => handleChange('receivedDate', e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Received Name */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <FileText size={14} className="text-blue-600" />
                                        Received Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.receivedName}
                                        onChange={(e) => handleChange('receivedName', e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Enter received name"
                                    />
                                </div>

                                {/* Received Amount */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                                        <DollarSign size={14} />
                                        Received Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            value={formData.receivedAmount}
                                            onChange={(e) => handleChange('receivedAmount', e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Office Expenditure */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Package size={14} className="text-slate-600" />
                                        Office Expenditure
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            value={formData.officeExpenditure}
                                            onChange={(e) => handleChange('officeExpenditure', e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Project Costing Section */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <h2 className="text-sm font-bold text-emerald-800 mb-3 flex items-center gap-2">
                                <TrendingUp size={16} />
                                Project Costing Calculation (SNS)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {/* UOM */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Package size={14} className="text-emerald-600" />
                                        UOM
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.uom}
                                        onChange={(e) => handleChange('uom', e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="e.g., pcs, lot"
                                    />
                                </div>

                                {/* Qty */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Package size={14} className="text-emerald-600" />
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.qty}
                                        onChange={(e) => handleChange('qty', e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>

                                {/* Paid Amount */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                                        <DollarSign size={14} />
                                        Paid Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            value={formData.paidAmount}
                                            onChange={(e) => handleChange('paidAmount', e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-amber-300 bg-amber-50 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Total Amount (Calculated) */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <DollarSign size={14} className="text-emerald-600" />
                                        Total Amount
                                    </label>
                                    <div className="px-3 py-2 rounded-lg font-bold text-sm bg-emerald-100 text-emerald-700 border border-emerald-300">
                                        ৳ {totalAmount.toFixed(2)}
                                    </div>
                                </div>

                                {/* Project Local Expenditure */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Package size={14} className="text-slate-600" />
                                        Project Local Exp.
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            value={formData.projectLocalExp}
                                            onChange={(e) => handleChange('projectLocalExp', e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Conveyance */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Package size={14} className="text-slate-600" />
                                        Conveyance
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            value={formData.conveyance}
                                            onChange={(e) => handleChange('conveyance', e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Office Expenditure 2 */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Package size={14} className="text-slate-600" />
                                        Office Expenditure
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            value={formData.officeExp2}
                                            onChange={(e) => handleChange('officeExp2', e.target.value)}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Remaining In Hand (Calculated) */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <TrendingUp size={14} className="text-purple-600" />
                                        Remaining In Hand
                                    </label>
                                    <div className={`px-3 py-2 rounded-lg font-bold text-sm border ${remainingInHand >= 0
                                        ? 'bg-purple-100 text-purple-700 border-purple-300'
                                        : 'bg-red-100 text-red-700 border-red-300'
                                        }`}>
                                        ৳ {remainingInHand.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Remarks Section */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                <FileText size={14} className="text-slate-600" />
                                Remarks
                            </label>
                            <textarea
                                value={formData.remarks}
                                onChange={(e) => handleChange('remarks', e.target.value)}
                                rows="2"
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                placeholder="Add any additional remarks or notes"
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex gap-3 justify-end">
                        <button
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="inline-flex items-center gap-2 px-6 py-2 text-sm bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all shadow-md"
                        >
                            <Save size={16} />
                            Save Entry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateExpandReceive;