import { configuration } from "./types";

const script_params = document.currentScript;
const idle_time = Number(script_params?.getAttribute('idle-time') || 0);
const website_id = script_params?.getAttribute('website-id') || '';
const analytics_endpoint = script_params?.getAttribute('analytics-endpoint') || 'http://localhost:8000';
const use_cookie = Boolean(script_params?.getAttribute('use-cookie') || false);

const Config: configuration = {
    idle_time,
    website_id,
    analytics_endpoint,
    use_cookie,
};

export {
    Config,
};