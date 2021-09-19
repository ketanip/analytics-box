import React, { useState, useEffect } from 'react';
import axios from "axios";
import CoreAnalysisChart from './components/CoreAnalysisChart';
import { filter } from './types/analysis';
import DashboardOverview from './components/DashboardOverview';
import FilterAndHeader from './components/FilterAndHeader';
import BaseAnalysisTable from './components/BaseAnalysisTable';

function App() {

  const [filter, setFilter] = useState<filter>();

  useEffect(() => {

    axios.get("http://localhost:8000", {

      params: {
        start: "2021-08-26",
        end: "2021-09-30",
        event: "page_view",
        domain: "localhost",
      }

    })
      .then(resp => {
        console.log("DATA", resp.data);
        setFilter(resp.data)
        console.log("REPORT", filter)
      })
      .catch(err => {
        console.log(err)
      });

  }, []);


  return (
    <>
      <div className="bg-gray-50 min-h-full px-10">

        {
          filter &&

          <div>

            {/* Filter and header */}
            <FilterAndHeader />

            {/* Overview */}
            <DashboardOverview overview={filter.data.overview} />

            {/* Main Chart */}
            <CoreAnalysisChart filter={filter} />


            {/* Operating Systems */}
            <h2 className="font-medium text-xl mb-5">Page Views</h2>
            <BaseAnalysisTable data={filter.data.page_views} />
            

            {/* Operating Systems */}
            <h2 className="font-medium text-xl mb-5">Referrers</h2>
            <BaseAnalysisTable data={filter.data.referers} />


            {/* Operating Systems */}
            <h2 className="font-medium text-xl mb-5">Browsers</h2>
            <BaseAnalysisTable data={filter.data.browsers} />

            {/* Operating Systems */}
            <h2 className="font-medium text-xl mb-5">Operating Systems</h2>
            <BaseAnalysisTable data={filter.data.operating_systems} />


            {/* Operating Systems */}
            <h2 className="font-medium text-xl mb-5">Countries</h2>
            <BaseAnalysisTable data={filter.data.countries} />


          </div>
        }

      </div>
    </>
  );
}

export default App;