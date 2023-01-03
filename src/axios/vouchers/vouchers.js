import axios from 'axios';

export async function createVouchersApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/vouchers/store?date=${values.date}&voucher_no=${values.voucher_no}&description=${values.description}&booking_confirmation_id=${values.bookingconfirmationselect}&bill_of_landing_id=${values.billoflandingselect}&vendor_id=${values.vendorselect}&currency_id=${values.currencyselect}&status=${values.activeselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editVouchersApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/vouchers/store?date=${values.date}&voucher_no=${values.voucher_no}&description=${values.description}&booking_confirmation_id=${values.bookingconfirmationselect}&bill_of_landing_id=${values.billoflandingselect}&vendor_id=${values.vendorselect}&currency_id=${values.currencyselect}&status=${values.activeselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllVouchersApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/vouchers/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
