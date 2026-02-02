import React, { useState, useEffect } from 'react';
import { Save, X, Package, Calendar, DollarSign, FileText, Loader2 } from 'lucide-react';
import { useUpdateLocalPurchaseMutation, useGetLocalPurchaseByIdQuery } from '../../redux/features/locapurchaseSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditLocalPurchase = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        projectName: '',
        date: '',
        description: '',
        requisitionAmount: '',
        paidSNS: '',
        paidMWTIL: '',
        pettyCash: '',
        updateBy: ''
    });

    // Fetch existing purchase data
    const { data: purchaseData, isLoading: isFetching, error: fetchError, refetch } =
        useGetLocalPurchaseByIdQuery(id, {
            refetchOnMountOrArgChange: true,
        });
    const [updateLocalPurchase, { isLoading: isUpdating, isSuccess, error: updateError }] = useUpdateLocalPurchaseMutation();

    // Populate form when data is fetched
    useEffect(() => {
        if (purchaseData) {
            setFormData({
                projectName: purchaseData.projectName || '',
                date: purchaseData.date ? purchaseData.date.split('T')[0] : '',
                description: purchaseData.description || '',
                requisitionAmount: parseInt(purchaseData.requisitionAmount) || '',
                paidSNS: purchaseData.paidSNS || '',
                paidMWTIL: purchaseData.paidMWTIL || '',
                pettyCash: purchaseData.pettyCash || '',
                updateBy: ''
            });
        }
    }, [purchaseData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateDue = () => {
        const requisition = parseFloat(formData.requisitionAmount) || 0;
        const paidSNS = parseFloat(formData.paidSNS) || 0;
        const paidMWTIL = parseFloat(formData.paidMWTIL) || 0;
        const pettyCash = parseFloat(formData.pettyCash) || 0;
        const due = requisition - paidSNS - paidMWTIL - pettyCash;
        return due > 0 ? due : 0;
    };

    const calculateTotalCosting = () => {
        const paidSNS = parseFloat(formData.paidSNS) || 0;
        const paidMWTIL = parseFloat(formData.paidMWTIL) || 0;
        const pettyCash = parseFloat(formData.pettyCash) || 0;
        return paidSNS + paidMWTIL + pettyCash;
    };

    const validateForm = () => {
        if (!formData.projectName.trim()) {
            alert('Project name is required');
            return false;
        }
        if (!formData.date) {
            alert('Date is required');
            return false;
        }
        if (!formData.description.trim()) {
            alert('Description is required');
            return false;
        }
        if (!formData.requisitionAmount || parseFloat(formData.requisitionAmount) <= 0) {
            alert('Valid requisition amount is required');
            return false;
        }

        const requisition = parseFloat(formData.requisitionAmount) || 0;
        const totalPaid = calculateTotalCosting();

        if (totalPaid > requisition) {
            alert('Total paid amount cannot exceed requisition amount');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            const submissionData = {
                id: id,
                projectName: formData.projectName.trim(),
                date: formData.date,
                description: formData.description.trim(),
                requisitionAmount: parseFloat(formData.requisitionAmount) || 0,
                paidSNS: parseFloat(formData.paidSNS) || 0,
                paidMWTIL: parseFloat(formData.paidMWTIL) || 0,
                pettyCash: parseFloat(formData.pettyCash) || 0,
                totalPaid: calculateTotalCosting(),
                dueAmount: calculateDue(),
                updateBy: formData.updateBy || 'current-user-id'
            };

            const res = await updateLocalPurchase(submissionData).unwrap();

            if (res) {
                navigate('/purchase-list');
            }
        } catch (err) {
            console.error('Error:', err);
            alert(`Error updating purchase: ${err?.data?.message || err.message || 'Unknown error'}`);
        }
    };

    const totalCosting = calculateTotalCosting();
    const dueAmount = calculateDue();

    // Loading state
    if (isFetching) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Loading purchase data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (fetchError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Data</h2>
                        <p className="text-red-600 mb-4">
                            {fetchError?.data?.message || 'Failed to load purchase data'}
                        </p>
                        <button
                            onClick={() => navigate('/local-purchase')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <X size={16} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3">
                        <h1 className="text-xl font-bold text-white">Edit Local Purchase</h1>
                        <p className="text-emerald-100 text-xs mt-1">Update project purchase record</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-4 space-y-4">
                        {/* Project Info Section */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <Package size={16} />
                                Project Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Project Name */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <FileText size={14} className="text-emerald-600" />
                                        Project Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="projectName"
                                        value={formData.projectName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="Enter project name"
                                        required
                                    />
                                </div>

                                {/* Date */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <Calendar size={14} className="text-emerald-600" />
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        required
                                    />
                                </div>

                                {/* Requisition Amount */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                                        <DollarSign size={14} />
                                        Requisition Amount <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            name="requisitionAmount"
                                            value={formData.requisitionAmount}
                                            onChange={handleChange}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <FileText size={14} className="text-slate-600" />
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="2"
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                        placeholder="Enter purchase description"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Details Section */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h2 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
                                <DollarSign size={16} />
                                Payment Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {/* Paid SNS */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <DollarSign size={14} className="text-green-600" />
                                        Paid Amount - SNS
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            name="paidSNS"
                                            value={formData.paidSNS}
                                            onChange={handleChange}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                {/* Paid MWTIL */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <DollarSign size={14} className="text-green-600" />
                                        Paid Amount - MWTIL
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            name="paidMWTIL"
                                            value={formData.paidMWTIL}
                                            onChange={handleChange}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                {/* Petty Cash */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                        <DollarSign size={14} className="text-blue-600" />
                                        Petty Cash
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                                        <input
                                            type="number"
                                            name="pettyCash"
                                            value={formData.pettyCash}
                                            onChange={handleChange}
                                            className="w-full pl-7 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        {formData.requisitionAmount && (
                            <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-4">
                                <h2 className="text-sm font-bold text-slate-800 mb-3">Summary</h2>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                                        <p className="text-xs text-slate-500 mb-1">Total Paid</p>
                                        <p className="text-lg font-bold text-emerald-700">৳{totalCosting.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                                        <p className="text-xs text-slate-500 mb-1">Due Amount</p>
                                        <p className={`text-lg font-bold ${dueAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                            ৳{dueAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm border border-emerald-200">
                                        <p className="text-xs text-slate-500 mb-1">Requisition</p>
                                        <p className="text-lg font-bold text-emerald-600">
                                            ৳{parseFloat(formData.requisitionAmount).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Status/Error Messages */}
                        {isSuccess && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                                Purchase updated successfully!
                            </div>
                        )}
                        {updateError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                Error: {updateError?.data?.message || 'Failed to update purchase'}
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex gap-3 justify-end">
                        <button
                            onClick={() => navigate('/local-purchase')}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors"
                            type="button"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isUpdating}
                            className="inline-flex items-center gap-2 px-6 py-2 text-sm bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                        >
                            <Save size={16} />
                            {isUpdating ? 'Updating...' : 'Update Purchase'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLocalPurchase;