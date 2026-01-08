import React from 'react'
import { useDebounce } from 'use-debounce';
import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearchPostsQuery } from '../redux/features/allPostSlice';

const CustomSearchPost = () => {


    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);

    const {
        data: searchData = [],
        isLoading: isSearching,
    } = useSearchPostsQuery(debouncedSearch, {
        skip: !debouncedSearch,
    });

    console.log("searchData:", searchData);

    return (
        < div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 max-w-xl" >
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by mobile number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 animate-spin" />
                )}
            </div>

            {
                debouncedSearch && (

                    <div className={`absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-300 z-50`}>
                        <div className="max-h-[400px] overflow-y-auto ">
                            {searchData.length === 0 ? (
                                <div className="px-6 py-8 text-center">
                                    <Search className="w-10 h-10 text-gray-300 mb-3 mx-auto" />
                                    <p className="text-sm font-medium text-gray-900 mb-1">No results found</p>
                                    <p className="text-sm text-gray-500">Try searching with a different mobile number</p>
                                </div>
                            ) : (
                                <div className="py-2">
                                    {searchData.map((item, i) => (

                                        // <Link to={`/customerDetails/${item._id}`}>

                                        <div
                                            key={item._id}
                                            className={`px-4 py-3 hover:bg-gray-200  cursor-pointer transition-colors border-b border-gray-100 last:border-b-0`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                                    {item.creatorName.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm text-gray-600">
                                                            {item.creatorName}
                                                        </span>
                                                        <span className="text-sm font-semibold text-gray-900">
                                                            {item.phoneNumber}
                                                        </span>
                                                        <span className={`text-sm font-semibold ${item.status === 1 ? "text-green-600" : "text-red-600"}`}>
                                                            {item.status === 1 ? "(Active)" : "(Inactive)"}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        { } Posted on: {new Date(item.createdAt).toLocaleDateString()}
                                                        {item.category && (
                                                            <span> | Category: {item.category}</span>
                                                        )}
                                                        {item.subcategory && (
                                                            <span> | Subcategory: {item.subcategory}</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        // </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default CustomSearchPost