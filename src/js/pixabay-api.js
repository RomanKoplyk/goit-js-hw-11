import axios from "axios";

const API_KEY = "55677845-05ff8047ada01a07b33efb575";
const BASE_URL = "https://pixabay.com/api/";

export function getImagesByQuery(query) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: `true`
    });

    return axios.get(`${BASE_URL}?${searchParams}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Sorry, there are no images matching your search query. Please, try again!", error);
            throw error;
        });
}
