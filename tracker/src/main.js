// Imports compatible with browserify.
const TimeMe = require("timeme.js");
const { GetCurrentSession, GetUTMParams, getScrollPercent } = require('./util');

// Backend Analytics URL.
const ANALYTICS_ENDPOINT = document.currentScript.getAttribute("analytics-endpoint");

// Time below which a user is considered a bounce.
const IDLE_TIME = 0;

// Global Variables.
let max_scroll = 0;
let utm_params = {};

// Adding load listener to initialize timeme.
window.addEventListener("load", function () {

    // To track total time spent.
    TimeMe.initialize({
        currentPageName: document.pathname, // current page
        idleTimeoutInSeconds: 0 // seconds
    });

})


// Function to send data to backend for analytical purposes.
const SendPayload = (event) => {

    // Empty Form
    const payload = new FormData();

    // Data to be sent.
    const data = {
        event,
        session_id: GetCurrentSession(),
        domain: window.location.hostname,
        page_route: location.pathname,
        duration: Math.round(TimeMe.getTimeOnPageInSeconds(document.pathname)),
        scrolled_percentage: max_scroll,
        referrer: document.referrer,

        utm_source: utm_params.utm_source,
        utm_medium: utm_params.utm_medium,
        utm_campaign: utm_params.utm_campaign,

        device_height: window.outerHeight,
        device_width: window.outerWidth,
    };

    // Adding data to form.
    payload.append('data', JSON.stringify(data));

    // Sending Data.
    navigator.sendBeacon(ANALYTICS_ENDPOINT, payload);

};

// To get percentage of page scrolled.
setInterval(() => {
    let scroll_percentage = getScrollPercent();
    if (max_scroll < scroll_percentage) {
        max_scroll = scroll_percentage;;
    };
}, 500)

// Get UTM Params in advance.
GetUTMParams();

// Adding SendEvent to window object so it can be accessed anywhere.
window.SendEvent = SendPayload;

// Page unload event listener.
window.addEventListener("unload", function () {

    if (TimeMe.getTimeOnCurrentPageInSeconds() > IDLE_TIME) {
        SendPayload("page_view");
    };

});