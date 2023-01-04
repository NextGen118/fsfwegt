import axios from 'axios';

export async function createVendorApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/vendors/store?vendor_code=${values.vendor_code}
            &vendor_name=${values.vendor_name}&sub_code=${values.sub_code}
            &country_id=${values.countryselect}&port_id=${values.portselect}&email=${values.email}&telephone_number=${values.telephone_number}
            &fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}
            &address=${values.address}&image&remarks=${values.remarks}&is_active=${values.activeselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllVendorApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/clients/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}

export async function editVendorApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/vendors/store?vendor_code=${values.vendor_code}
            &vendor_name=${values.vendor_name}&sub_code=${values.sub_code}&country_id=${values.countryselect}&port_id=${values.portselect}&email=${values.email}&telephone_number=${values.telephone_number}
            &fax=${values.fax}&mobile_number=${values.mobile_number}&contact_name=${values.contact_name}&address=${values.address}&image=&remarks=${values.remarks}&is_active=${values.activeselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}
