import { store } from '@risingstack/react-easy-state';
import { response } from '../types/analysis';
import { GetData } from './util';

// default start date ( -7 days from current date)
// and end date ( +1 day from today's date).
const date = new Date();
const start_date = new Date(Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getUTCDate() - 7)).toISOString().split('T')[0];
const end_date = new Date(Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getUTCDate() + 1)).toISOString().split('T')[0];

// Store for this project.
const dataStore: any = store({

    // Indicates whether there is data in data object, 
    has_data: false,

    // stores data received from querying backend.
    data: {},

    // sets data.
    setData: (payload: response) => {
        dataStore.data = payload;
    },

    // filter object to store data filter configuration.
    filter: {
        domain: "localhost",
        event: "page_view",
        start:  start_date,
        end: end_date,
        country_code: "",
        referer: "",
        page_route: "",
        os: "",
        browser: ""
    },

    // changes filter and queries database for new data filter
    // and stores data in data object.
    filterData: async (payload: typeof dataStore.filter) => {

        const required_properties = payload.domain || payload.event || payload.start || payload.end;

        if (!required_properties) {
            alert("Invalid Filter");
            return;
        };

        Object.assign(dataStore.filter, payload);
        const data = await GetData(payload);

        dataStore.data = data;
        dataStore.has_data = true;
        console.log(dataStore.data)

    },

    // Function to get initial data.
    getInitialData: async () => {

        const data = await GetData(dataStore.filter);

        dataStore.data = data;
        dataStore.has_data = true;

    },


});


export default dataStore;