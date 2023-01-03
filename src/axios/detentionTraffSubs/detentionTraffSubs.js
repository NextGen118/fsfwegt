import axios from 'axios';

export async function createDetentionTraffSubsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentiontraffsubs/store?tariff_name=${values.tariff_name}&slab_days=${values.slab_days}&slab_rate=${values.slab_rate}&detention_traffic_id=${values.detentiontraffiesselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editDetentionTraffSubsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentiontraffsubs/store?tariff_name=${values.tariff_name}&slab_days=${values.slab_days}&slab_rate=${values.slab_rate}&detention_traffic_id=${values.detentiontraffiesselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllDetentionTraffSubsApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/detentiontraffsubs/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
