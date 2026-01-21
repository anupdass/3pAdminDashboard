import React, { useState } from "react";
import { Search, Plus, Edit, Calendar, DollarSign, TrendingUp, TrendingDown, Eye, Trash2 } from "lucide-react";
import { useGetAllClientPoQuery } from "../../redux/features/clientPoSlice";

import { Link } from "react-router-dom";
import PoDetailsModal from "../../components/PoDetailsModal";


const ClientAndPo = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isError } = useGetAllClientPoQuery();

    const [openModal, setOpenModal] = useState(false);
    const [selectedPoId, setSelectedPoId] = useState(null);

    const handleView = (id) => {
        setSelectedPoId(id);
        setOpenModal(true);
    };

    // Calculate totals
    const totals = data?.reduce((acc, po) => ({
        poValue: Number(acc.poValue) + Number(po.poValue),
        poAccountPay: Number(acc.poAccountPay) + Number(po.poAccountPay),
        poHandPay: Number(acc.poHandPay) + Number(po.poHandPay),
        poDueAmount: Number(acc.poDueAmount) + Number(po.poDueAmount)
    }), { poValue: 0, poAccountPay: 0, poHandPay: 0, poDueAmount: 0 });

    const totalAdvance = totals?.poAccountPay + totals?.poHandPay;

    // Filter data based on search
    const filteredData = data?.filter(po =>
        po.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-600 text-lg font-semibold">Error loading data</div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                    <div className="bg-white rounded-md shadow-sm p-3 border-l-2 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">
                                    Total PO Value
                                </p>
                                <p className="text-lg font-semibold text-gray-800 mt-0.5">
                                    {formatCurrency(totals?.poValue || 0)}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <DollarSign className="text-blue-600" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md shadow-sm p-3 border-l-2 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">
                                    Total PO Advanced
                                </p>
                                <p className="text-lg font-semibold text-gray-800 mt-0.5">
                                    {formatCurrency(totalAdvance || 0)}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <TrendingUp className="text-emerald-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md shadow-sm p-3 border-l-2 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">
                                    Total PO Due Amount
                                </p>
                                <p className="text-lg font-semibold text-gray-800 mt-0.5">
                                    {formatCurrency(totals?.poDueAmount || 0)}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <TrendingDown className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md shadow-sm p-3 border-l-2 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">
                                    Total PO Entries
                                </p>
                                <p className="text-lg font-bold text-gray-800 mt-1">{data?.length || 0}</p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Calendar className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>

                </div>


                {/* Header Section */}
                <div className="my-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* Create PO Button */}
                    <Link
                        to="/createpurchase"
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center gap-2 justify-center"
                    >
                        <Plus size={20} />
                        Create New PO
                    </Link>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search by client name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>





                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                    <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">SL</th>
                                    <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Client Name</th>
                                    <th className="px-4 py-4 text-right text-sm font-semibold whitespace-nowrap">PO Value</th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold bg-emerald-600 bg-opacity-30 whitespace-nowrap" colSpan="3">
                                        Advance Received
                                    </th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold bg-orange-600 bg-opacity-30 whitespace-nowrap" colSpan="2">
                                        Remaining Due
                                    </th>
                                    <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Remarks</th>
                                    <th className="px-4 py-4 text-center text-sm font-semibold whitespace-nowrap">Action</th>
                                </tr>
                                <tr className="bg-gray-50 border-b">
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">AC Pay</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">Hand Cash</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">PO Date</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">Due Amount</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 whitespace-nowrap">Payment Date</th>
                                    <th className="px-4 py-3"></th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData?.map((po, index) => (
                                    <tr
                                        key={po._id}
                                        className="border-b hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="font-semibold text-gray-800">{po.clientName}</div>
                                        </td>
                                        <td className="px-4 py-4 text-right whitespace-nowrap">
                                            <span className="font-bold text-blue-700">
                                                {formatCurrency(po.poValue)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center text-emerald-700 font-semibold whitespace-nowrap">
                                            {formatCurrency(po.poAccountPay)}
                                        </td>
                                        <td className="px-4 py-4 text-center text-emerald-700 font-semibold whitespace-nowrap">
                                            {formatCurrency(po.poHandPay)}
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-600 whitespace-nowrap">
                                            {formatDate(po.poDate)}
                                        </td>
                                        <td className="px-4 py-4 text-center whitespace-nowrap">
                                            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold text-sm">
                                                {formatCurrency(po.poDueAmount)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm text-gray-600 whitespace-nowrap">
                                            {formatDate(po.paymentDate)}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                                            <div className="max-w-[200px] truncate" title={po.poRemarks}>
                                                {po.poRemarks || '-'}
                                            </div>
                                        </td>

                                        {/* <td className="px-4 py-4 text-center flex justify-center flex-wrap gap-4">

                                            <div
                                                onClick={() => handleView(po._id)}
                                                className="text-green-600 font-bold"
                                            >
                                                <Eye size={20} className="text-yellow-600 font-bold" />
                                            </div>

                                            <Link to={`/editpurchase/${po._id}`}>
                                                <Edit size={20} className="text-blue-600 font-bold" />
                                            </Link>
                                        </td> */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <div
                                                    onClick={() => handleView(po._id)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </div>
                                                <Link to={`/editpurchase/${po._id}`}
                                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            {/* Totals Row */}
                            <tfoot>
                                <tr className="bg-gradient-to-r from-gray-100 to-gray-200 font-bold">
                                    <td colSpan="2" className="px-4 py-4 text-right text-gray-800 whitespace-nowrap">TOTAL:</td>
                                    <td className="px-4 py-4 text-right text-blue-800 font-bold whitespace-nowrap">
                                        {formatCurrency(totals?.poValue || 0)}
                                    </td>
                                    <td className="px-4 py-4 text-center text-emerald-800 font-bold whitespace-nowrap">
                                        {formatCurrency(totals?.poAccountPay || 0)}
                                    </td>
                                    <td className="px-4 py-4 text-center text-emerald-800 font-bold whitespace-nowrap">
                                        {formatCurrency(totals?.poHandPay || 0)}
                                    </td>
                                    <td className="px-4 py-4"></td>
                                    <td className="px-4 py-4 text-center text-orange-800 font-bold whitespace-nowrap">
                                        {formatCurrency(totals?.poDueAmount || 0)}
                                    </td>
                                    <td colSpan="3" className="px-4 py-4"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {filteredData?.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-lg mt-6">
                        <div className="text-gray-400 mb-4">
                            <Search size={48} className="mx-auto" />
                        </div>
                        <p className="text-gray-600 text-lg">No purchase orders found</p>
                        <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>

            <PoDetailsModal
                id={selectedPoId}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />

        </div>
    );
};

export default ClientAndPo;