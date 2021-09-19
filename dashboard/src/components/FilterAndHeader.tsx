import React from 'react'

const FilterAndHeader = () => {
    return (
        <>

            <div className="flex pt-8">
                <h1 className="text-2xl font-bold">Localhost</h1>
                <div className="flex-grow"></div>
                <button className="p-3 bg-blue-500 text-white font-medium rounded-lg">Filter</button>
            </div>

        </>
    );
};

export default FilterAndHeader;