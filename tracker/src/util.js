const uuid = require('uuidv4');

// Gets session and creates if it doesn't exists.
const GetCurrentSession = () => {

    // Session id variable.
    let session_id;

    // Getting and returning session ID if it exists.
    session_id = sessionStorage.getItem('session_id');
    if (session_id !== null) {
        return session_id
    };

    // Creating and setting session ID and returning it.
    session_id = uuid.uuid();
    sessionStorage.setItem('session_id', session_id);
    return session_id;

};


// To Obtain UTM Params
const GetUTMParams = () => {

    // Getting all url parameters.
    const urlParams = new URLSearchParams(window.location.search);

    // Getting UTM parameters from all parameters.
    utm_params = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
    };


};


// To get page scroll percentage.
const getScrollPercent = () => {

    let h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    return Math.round(
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100)
    );

};


module.exports = {
    GetCurrentSession,
    GetUTMParams,
    getScrollPercent,
};