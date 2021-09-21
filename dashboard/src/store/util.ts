import axios from "axios";
import dataStore from "./store";

// GetData gets data from backend.
const GetData = async (params: any) => {

    // Getting response.
    const resp = await axios.get("http://localhost:8000/", {
        params,
    })

    // Checking if response has null values.
    if (!(resp.data.data.analysis  || resp.data.data.referers || resp.data.data.operating_systems || resp.data.data.browsers || resp.data.data.page_views || resp.data.data.countries)) {

        // Telling user that no data for given filter exists.
        alert("INVALID FILTER");

        // Returning the same data that is in use.        
        return dataStore.data;

    };

    // Returning new data.
    return resp.data;

};


export {
    GetData,
}