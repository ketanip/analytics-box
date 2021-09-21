import { store } from '@risingstack/react-easy-state';
import { response } from '../types/analysis';
import { GetData } from './util';

const date = new Date();
const start_date = new Date(Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getUTCDate() - 7)).toISOString().split('T')[0];
const end_date = new Date(Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getUTCDate() + 1)).toISOString().split('T')[0];

const dataStore: any = store({

    has_data: false,

    data: {},


    setData: (payload: response) => {
        dataStore.data = payload;
    },

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


    getInitialData: async () => {

        const data = await GetData(dataStore.filter);

        dataStore.data = data;
        dataStore.has_data = true;

    },


});

export default dataStore;