import BrowserInteractionTime from 'browser-interaction-time';
import { Config } from './config';

// time_counter global variable to share states across various functions.
let time_counter: BrowserInteractionTime;

// Start counter and being to record time.
const StartTimer = () => {

    time_counter = new BrowserInteractionTime({
        idleTimeoutMs: Config.idle_time * 1000,
    });

    time_counter.startTimer();
    
};


// GetTimePassed gives time passed since page is loaded.
const GetTimePassed = (): number => {

    return time_counter.getTimeInMilliseconds() / 1000;

};

// Resets timer.
const ResetTimer = () => {
    time_counter.reset();
};

export {
    StartTimer,
    GetTimePassed,
    ResetTimer,
};