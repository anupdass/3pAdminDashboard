import React, { useState } from 'react';
import { FileText, DollarSign, CreditCard, Banknote, AlertCircle } from 'lucide-react';

const CreateSE = () => {
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        costing: '',
        bcbl: '',
        cash: '',
        remarks: ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const calculatePaymentDue = () => {
        const costing = parseFloat(formData.costing) || 0;
        const bcbl = parseFloat(formData.bcbl) || 0;
        const cash = parseFloat(formData.cash) || 0;
        return costing - bcbl - cash;
    };

    const paymentDue = calculatePaymentDue();

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Add your submit logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
            <div className="w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
                        <h1 className="text-xl font-bold text-white">Service Entry Form</h1>
                        <p className="text-blue-100 text-xs mt-1">Enter project costs and payment details</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-4 space-y-4">
                        {/* Project Name */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                <FileText size={14} className="text-blue-600" />
                                Project Name
                            </label>
                            <input
                                type="text"
                                value={formData.projectName}
                                onChange={(e) => handleChange('projectName', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800"
                                placeholder="Enter project name"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                <FileText size={14} className="text-blue-600" />
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows="2"
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 resize-none"
                                placeholder="Enter project description"
                            />
                        </div>

                        {/* Financial Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {/* Costing Amount */}
                            <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                                    <DollarSign size={14} />
                                    Costing Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                    <input
                                        type="number"
                                        value={formData.costing}
                                        onChange={(e) => handleChange('costing', e.target.value)}
                                        className="w-full pl-7 pr-3 py-2 text-sm border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-slate-800"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Payment BCBL */}
                            <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                    <CreditCard size={14} className="text-blue-600" />
                                    Payment (BCBL)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                    <input
                                        type="number"
                                        value={formData.bcbl}
                                        onChange={(e) => handleChange('bcbl', e.target.value)}
                                        className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Cash Payment */}
                            <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                    <Banknote size={14} className="text-emerald-600" />
                                    Cash Payment
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                    <input
                                        type="number"
                                        value={formData.cash}
                                        onChange={(e) => handleChange('cash', e.target.value)}
                                        className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-800"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Payment Due (Calculated) */}
                            <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                    <AlertCircle size={14} className="text-amber-600" />
                                    Payment Due
                                </label>
                                <div className={`px-3 py-2 rounded-lg font-bold text-sm ${paymentDue > 0 ? 'bg-red-100 text-red-700 border border-red-300' :
                                        paymentDue < 0 ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                                            'bg-emerald-100 text-emerald-700 border border-emerald-300'
                                    }`}>
                                    ৳ {paymentDue.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        {/* Remarks */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                <FileText size={14} className="text-blue-600" />
                                Remarks
                            </label>
                            <textarea
                                value={formData.remarks}
                                onChange={(e) => handleChange('remarks', e.target.value)}
                                rows="2"
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 resize-none"
                                placeholder="Add any additional remarks or notes"
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex gap-3 justify-end">
                        <button
                            className="px-4 py-2 text-sm border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-md"
                        >
                            Save Entry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSE;