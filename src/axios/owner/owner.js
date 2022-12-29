import axios from 'axios';

export async function createOwnerApiCall(values) {
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/owners/store?owner_code=${values.owner_code}&owner_name=${values.owner_name}&sub_code=${values.sub_code}&country_id=${values.countryselect}&port_id=${values.portselect}&email=${values.email}&telephone_number=${values.telephone_number}&fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}&address=${values.address}&remarks=${values.remarks}&is_active=${values.activeselect}`
        );
        return response
    } catch (error) {
        return error
    }
}

export async function showAllOwnerApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/owners/show/all`)
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}

