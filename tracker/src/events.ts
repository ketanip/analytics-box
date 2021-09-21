import { GetCurrentSession, PAGE_SCROLL, GetUTMParams } from './util';
import { payload } from './types';
import { Config } from './config';
import { GetTimePassed } from './time_counter';

const PreparePayload = (event: string): payload => {

    // Getting UTM Params.
    const utm_params = GetUTMParams();

    // Payload data object.
    const payload_data: payload = {

        event,
        session_id: GetCurrentSession(),
        domain: window.location.hostname,
        page_route: location.pathname,
        duration: 0,

        scrolled_percentage: PAGE_SCROLL,
        referrer: document.referrer,

        utm_source: utm_params.utm_source,
        utm_medium: utm_params.utm_medium,
        utm_campaign: utm_params.utm_campaign,

        device_height: window.outerHeight,
        device_width: window.outerWidth,

    };

    // Returning generated payload_data.
    return payload_data;

};

const SendEvent = (event: string) => {

    // Getting data.
    const time_passed = GetTimePassed();
    const payload_data = PreparePayload(event);
    console.log(payload_data);
    

    // Adding data to form.
    const payload = new FormData();
    payload.append('data', JSON.stringify(payload_data));

    // Sending Data.
    if (time_passed > Config.idle_time) {
        navigator.sendBeacon(Config.analytics_endpoint, payload);
    };


};

export {
    SendEvent,
};