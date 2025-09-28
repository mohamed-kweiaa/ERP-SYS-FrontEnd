export function handleApiError(error , defaultMessage = "An unexpected error occurred") {
    if (!error) return defaultMessage;

    // strapi error format by koya ^_^
    if (error.response?.data?.error?.message) {
        return error.response.data.error.message;
    }

    // strapi new error format by koya ^_^

    if (error?.error?.message) {
        return error.error.message;
    }

    // Axios Network error format by koya ^_^
    if (error?.message) {
        return error.message;
    }

    // fallback to default message by koya ^_^
    return defaultMessage;
}