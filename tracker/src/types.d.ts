type payload = {
    
    event: string;
    session_id: string;

    domain: string;
    page_route: string;
    duration: int;
    scrolled_percentage: int;
    
    referrer: string | null;

    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;

    device_height: number;
    device_width: number;
};


type configuration = {

    idle_time: number;
    website_id: string;
    analytics_endpoint: string;
    use_cookie: boolean;

};


export {
    payload,
    configuration,
};