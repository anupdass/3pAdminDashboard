import React from "react";
import ButtonForNavigate from "../../components/ButtonForNavigate";
import DateInput from "../../components/DateInput";

const ClientAndPo = () => {

    return (
        <div className="w-full overflow-x-auto p-5">

            <ButtonForNavigate btnText='Create New' navigate='/createpurchase' />


            <table className="w-full border border-black border-collapse text-sm">
                <thead>
                    {/* Top Header */}
                    <tr>
                        <th
                            colSpan="9"
                            className="border border-black py-2 text-center font-semibold text-base"
                        >
                            Vendor Name &amp; PO Amount
                        </th>
                    </tr>

                    {/* Group Header */}
                    <tr>
                        <th rowSpan="2" className="border border-black px-2 py-2">
                            SL
                        </th>
                        <th rowSpan="2" className="border border-black px-2 py-2">
                            Client Name
                        </th>
                        <th rowSpan="2" className="border border-black px-2 py-2">
                            PO Value
                        </th>

                        <th
                            colSpan="3"
                            className="border border-black px-2 py-2 bg-yellow-300 font-semibold"
                        >
                            Advance Received
                        </th>

                        <th
                            colSpan="2"
                            className="border border-black px-2 py-2 bg-orange-300 font-semibold"
                        >
                            Remaining Due
                        </th>

                        <th rowSpan="2" className="border border-black px-2 py-2">
                            Remarks
                        </th>
                        <th rowSpan="2" className="border border-black px-2 py-2">
                            Action
                        </th>
                    </tr>

                    {/* Sub Header */}
                    <tr>
                        <th className="border border-black px-2 py-2">AC Pay</th>
                        <th className="border border-black px-2 py-2">Hand Cash</th>
                        <th className="border border-black px-2 py-2">Date-PO</th>
                        <th className="border border-black px-2 py-2">Due</th>
                        <th className="border border-black px-2 py-2">Payment Date</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Example Row */}
                    <tr className="h-10">
                        <td className="border border-black text-center">1</td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ClientAndPo;
