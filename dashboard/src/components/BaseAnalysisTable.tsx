import React from 'react';
import { baseAnalysis } from "../types/analysis"

type props = {
    data: baseAnalysis[]
}

const BaseAnalysisTable: React.FC<props> = ({ data }) => {


    return (
        <>
            <div className="flex flex-col mb-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-200 text-left text-xs  text-black uppercase tracking-wider">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 ">

                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Views
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Unique Views
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Average Time Spent
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        data.map(item => (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{item.value}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{item.total_sessions}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{item.unique_sessions}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{item.duration_seconds}</div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BaseAnalysisTable;