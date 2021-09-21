import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';
import { Config } from './config';

let PAGE_SCROLL = 0;

// Gets session and creates if it doesn't exists.
const GetCurrentSession = () => {

    // Creating and setting session ID and returning it.
    const new_session_id = nanoid();

    // Checking is website owner wants to use cookie.
    if (Config.use_cookie) {

        // Getting session id from a cookie.
        const session_id = Cookies.get('session_id');
        if (session_id) {
            return session_id;
        };

        // Saving session id to a cookie
        // with one year expiration time.
        Cookies.set('session_id', new_session_id, {
            expires: 365 * 24 * 60 * 60,
            path: "/",
        });

        // Returning new session id.
        return new_session_id;

    };


    // Getting and returning session ID if it exists from session store.
    const session_id = sessionStorage.getItem('session_id');
    if (session_id) {
        return session_id
    };

    // Setting and returning new session_id in session store.
    sessionStorage.setItem('session_id', new_session_id);
    return new_session_id;

};


// To Obtain UTM Params
const GetUTMParams = () => {

    // Getting all url parameters.
    const urlParams = new URLSearchParams(window.location.search);

    // Getting UTM parameters from all parameters.
    const utm_params = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
    };

    return utm_params;

};


// To get page scroll percentage.
const GetScrollPercent = () => {

    const h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    return Math.round(
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100)
    );

};


setInterval(() => {

    let current_scroll = GetScrollPercent();

    if (PAGE_SCROLL < current_scroll) {
        PAGE_SCROLL = current_scroll;
    };

}, 500);


export {
    GetCurrentSession,
    GetUTMParams,
    PAGE_SCROLL,
};