import React from 'react';
import { overviewAnalysis } from "../types/analysis"

type props = {
    overview: overviewAnalysis,
}

const DashboardOverview: React.FC<props> = ({ overview }) => {

    const data = [
        {
            name: "Total Views",
            value: overview.total_sessions
        },
        {
            name: "Unique Views",
            value: overview.unique_sessions
        },
        {
            name: "Average Duration",
            value: overview.average_duration
        },

    ]

    return (
        <>
            <div className="flex text-xl gap-4 pt-5">

                {
                    data.map(item => (

                        <span className="grid grid-cols-1 gap-2 bg-white rounded-md p-5 shadow-md">
                            <span className="font-medium">{item.name}</span>
                            <span>{item.value}</span>
                        </span>

                    ))
                }

            </div>

        </>
    )

};


export default DashboardOverview;