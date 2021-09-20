import axios from "axios";
import dataStore from "./store";


const GetData = async (params: any) => {

    const resp = await axios.get("http://localhost:8000/", {
        params,
    })


    if (!(resp.data.data.analysis  || resp.data.data.referers || resp.data.data.operating_systems || resp.data.data.browsers || resp.data.data.page_views || resp.data.data.countries)) {

        alert("INVALID FILTER");
        return dataStore.data;

    };

    return resp.data;

};


export {
    GetData,
}