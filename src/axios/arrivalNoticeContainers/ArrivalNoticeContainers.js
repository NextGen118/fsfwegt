import axios from 'axios';

export async function createArrivalNoticeContainersApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/arrivalnoticecontainers/store?arrival_notice_id=${values.arrivalNoticeselect}&equipment_id=${values.equipmentselect}&type_of_unit_id=${values.typeofselect}&seal_no=${values.seal_no}&marks=${values.marks}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editArrivalNoticeContainersApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/arrivalnoticecontainers/store?arrival_notice_id=${values.arrivalNoticeselect}&equipment_id=${values.equipmentselect}&type_of_unit_id=${values.typeofselect}&seal_no=${values.seal_no}&marks=${values.marks}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllArrivalNoticeContainersApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/arrivalnoticecontainers/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
