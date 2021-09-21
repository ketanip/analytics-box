import { StartTimer } from "./time_counter";
import { SendEvent } from "./events";

// InitializeAnalytics starts analytics and attaches event listeners
// this is so you can start it after taking concent from user if you with to
// or are required by law to do so.
const InitializeAnalytics = () => {

    StartTimer();

    window.addEventListener("unload", () => {
        SendEvent('page_view');
    });

};

InitializeAnalytics();

export {
    InitializeAnalytics,
    SendEvent,
};