import axios from 'axios';

export async function createDetentionInvoiceContainersApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentioninvoicecontainers/store?arrival_notice_id=${values.arrivalNoticeselect}&equipment_id=${values.equipmentselect}&type_of_unit_id=${values.typeofselect}&seal_no=${values.seal_no}&payed=${values.payed}&marks=${values.marks}&other_recovery=${values.other_recovery}&remarks=${values.remarks}&status=${values.activeselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editDetentionInvoiceContainersApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentioninvoicecontainers/store?arrival_notice_id=${values.arrivalNoticeselect}&equipment_id=${values.equipmentselect}&type_of_unit_id=${values.typeofselect}&seal_no=${values.seal_no}&payed=${values.payed}&marks=${values.marks}&other_recovery=${values.other_recovery}&remarks=${values.remarks}&status=${values.activeselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllDetentionInvoiceContainersApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/detentioninvoicecontainers/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
