import { ServerResponse } from 'http';

// Success response function
export const success = (res, message, status = 200, data = null) => {
    if (!(res instanceof ServerResponse)) {
        console.error('Invalid response object passed to success function:', res);
        return;
    }
    res.status(status).json({
        error: false,
        status,
        message,
        data
    });
};

// Error response function
export const error = (res, message, status = 500, details = null) => {
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    console.error('[response error] ' + (details?.message || JSON.stringify(details, getCircularReplacer())));
    if (!(res instanceof ServerResponse)) {
        console.error('Invalid response object passed to error function:', res);
        return;
    }
    if (res.headersSent) { // Check if headers have already been sent
        return; // If they have, stop execution
    }

    // Ensure status is a valid HTTP status code
    if (typeof status !== 'number' || status < 100 || status > 599) {
        status = 500; // Default to internal server error
    }

    // Ensure message is a string
    if (typeof message !== 'string') {
        message = 'An error occurred';
    }

    // Ensure details is an object or null
    if (typeof details !== 'object' || details === null) {
        details = {};
    }

    res.status(status).json({
        error: true,
        status,
        message,
        details
    });
};