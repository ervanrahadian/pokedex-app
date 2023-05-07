import axios, { AxiosInstance } from "axios";
import get from "lodash/get";

import msg from "@constants/msg";

let cancelSource = null;

// Cancel axios request
export const cancelRequest = (msg = "cancel"): void => {
    if (cancelSource && typeof cancelSource.cancel === "function") {
        cancelSource.cancel(msg);
    }
};

// Custom interceptor for error response
const interceptorResponseError = (error) => {
    // Check if the error already in string
    if (typeof error === "string") {
        return Promise.reject(error);
    }

    const { response, message } = error;

    // Handle error when the response is undefined
    if (!response && message) {
        return Promise.reject(message);
    }

    // Get response real data from response.data (axios response)
    const data = get(response, "data");

    if (data) {
        // Handle when server give string data response

        if (typeof data === "string") {
            if (data.indexOf("html") >= 0) {
                return Promise.reject(msg.error.common.internalServiceError);
            }

            return Promise.reject(data);
        }

        // Check data is object
        else if (typeof data === "object") {
            return Promise.reject(data);
        }

        // Check ArrayBuffer response type (Download file)
        else if (
            get(response, "request.responseType") === "arraybuffer" &&
            data.toString() === "[object ArrayBuffer]"
        ) {
            const res = JSON.parse(Buffer.from(data).toString("utf8"));

            return Promise.reject(
                get(res, "message", msg.error.common.internalServiceError),
            );
        }

        // Handle when error response is JSON and has message attribute
        else if (data.data && data.data.errors) {
            const errors = data.data.errors;

            if (Array.isArray(errors)) {
                if (errors[0] && errors[0].message) {
                    return Promise.reject(errors[0].message);
                }
            }
        } else if (data.errors && data.errors.message) {
            if (typeof data.errors.message === "string") {
                if (data.errors.message === msg.error.common.sessionNotActive) {
                    return Promise.reject(msg.error.common.sessionNotActive);
                }

                return Promise.reject(data.errors.message);
            } else if (
                data.errors.message.error &&
                data.errors.message.error.error_description
            ) {
                if (
                    typeof data.errors.message.error.error_description ===
                    "string"
                ) {
                    return Promise.reject(
                        data.errors.message.error.error_description,
                    );
                }
            }
        }

        // Handle when error response is JSON and has message attribute
        else if (data.message) {
            // If data.message already a string
            if (typeof data.message === "string") {
                // Clear storage if message is for session not active
                if (data.message === msg.error.common.sessionNotActive) {
                    return Promise.reject(msg.error.common.sessionNotActive);
                }

                return Promise.reject(data.message);
            }

            // If data.message is an object and need to be destructed
            const message = get(data.message, "error.errors.message");
            if (message) {
                return Promise.reject(message);
            }
        }
    }

    // Return a message where there is an error from server
    return Promise.reject(data || msg.error.common.internalServiceError);
};

// Custom interceptor for success response
const interceptorResponse = (response) => response;

// Custom instance of axios with custom response
const baseApi = async (baseURL: string): Promise<AxiosInstance> => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    cancelSource = axios.CancelToken.source();

    // New instance of Axios
    const instance = axios.create({
        baseURL: baseURL,
        data: [],
        cancelToken: cancelSource.token,
        headers,
    });

    instance.interceptors.response.use(
        interceptorResponse,
        interceptorResponseError,
    );

    return instance;
};

export default baseApi;
