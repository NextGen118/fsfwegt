import axios from 'axios';

export async function createDetentionTraffiesApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentiontraffies/store?free_days=${values.free_days}&comm=${values.comm}&client_id_agent=${values.clientAgentselect}&currency_id=${values.currencyselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editDetentionTraffiesApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentiontraffies/store?free_days=${values.free_days}&comm=${values.comm}&client_id_agent=${values.clientAgentselect}&currency_id=${values.currencyselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllDetentionTraffiesApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/detentiontraffies/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
