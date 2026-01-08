import React, { useState } from "react";
import { useCreateUserMutation, useGetAllUsersQuery, useResetUserPassMutation, useUpdateAdminUserMutation, useUpdateUserRoleMutation } from "../redux/features/usersSlice";
import CustomButton from "../components/CustomButton";
import CustomModal from "../components/CustomModal";
import UpdateRoleModal from "../components/UpdateRoleModal";
import { Edit, UserCog, Eye, Search, Filter, Users as UsersIcon, RotateCcwKey } from 'lucide-react';
import SuccessModal from "../components/SuccessModal";

const Users = () => {
    const { data, isLoading, error } = useGetAllUsersQuery();

    const [createUser, { isLoading: creating, error: createError },] = useCreateUserMutation();
    const [updateAdminUser, { error: updateError }] = useUpdateAdminUserMutation();
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [resetUserPass, { isLoading: isResetting, }] = useResetUserPassMutation();

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [selectedUser, setSelectedUser] = useState(null);
    const [roleModalOpen, setRoleModalOpen] = useState(false);

    const openCreate = () => {
        setMode("create");
        setSelectedUser(null);
        setOpen(true);
    };

    const openEdit = (user) => {
        setMode("edit");
        setSelectedUser(user);
        setOpen(true);
    };

    const handleCreate = async (payload) => {
        try {
            if (mode === "edit") {
                await updateAdminUser(payload).unwrap();
                setOpen(false);
                return;
            } else {
                await createUser(payload).unwrap();
                setOpen(false);
            }
        } catch (err) {
            console.error("Create failed:", err);
        }
    };

    const handleUpdateRole = async (userId, roles) => {
        try {
            await updateUserRole({ adminId: userId, role: roles }).unwrap();
            setRoleModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const handleResetPass = async (user) => {
        try {
            await resetUserPass({ id: user._id }).unwrap();
            setSuccessModalOpen(true);
            setAlertMsg(`Password for ${user.name} has been reset successfully.`);
        } catch (err) {
            console.error("Password reset failed:", err);
            alert("Password reset failed");
        }
    }



    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600 font-medium">Failed to load users</p>
                </div>
            </div>
        );
    }


    const activeUsers = data?.filter(u => u.status === 1).length || 0;
    const inactiveUsers = data?.filter(u => u.status === 0).length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-slate-600 text-sm mb-1">Total Users</div>
                                <div className="text-2xl font-bold text-slate-800">{data?.length || 0}</div>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <UsersIcon className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-slate-600 text-sm mb-1">Active Users</div>
                                <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-slate-600 text-sm mb-1">Inactive Users</div>
                                <div className="text-2xl font-bold text-red-600">{inactiveUsers}</div>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <CustomButton btnText="Add New User" onClick={openCreate} />

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">#</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">User Details</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Created Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {data?.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-slate-600 font-medium">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                                    {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-800">{user.name}</div>
                                                    <div className="text-xs text-slate-500">ID: {user._id}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-slate-700 font-medium">{user.mobile}</div>
                                        </td>

                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${user.status === 1
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${user.status === 1 ? 'bg-green-500' : 'bg-red-500'
                                                    }`}></span>
                                                {user.status === 1 ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    className="group relative px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all hover:shadow-lg hover:scale-105"
                                                    onClick={() => openEdit(user)}
                                                    title="Edit User"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>

                                                <button
                                                    className="group relative px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-all hover:shadow-lg hover:scale-105"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setRoleModalOpen(true);
                                                    }}
                                                    title="Edit Role"
                                                >
                                                    <UserCog className="w-4 h-4" />
                                                </button>

                                                <button
                                                    className="group relative px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all hover:shadow-lg hover:scale-105"
                                                    onClick={() => handleResetPass(user)}
                                                    title="Reset Password"
                                                    disabled={isResetting}
                                                >
                                                    {/* Reset Password */}
                                                    <RotateCcwKey className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {data?.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-1">No users found</h3>
                        </div>
                    )}
                </div>
            </div>

            <CustomModal
                open={open}
                mode={mode}
                user={selectedUser}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
                loading={creating}
                error={createError || updateError}
            />

            <UpdateRoleModal
                open={roleModalOpen}
                user={selectedUser}
                onClose={() => setRoleModalOpen(false)}
                onUpdate={handleUpdateRole}
                loading={false}
            />

            <SuccessModal
                open={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                message={alertMsg}
            />

        </div>
    );
};

export default Users;