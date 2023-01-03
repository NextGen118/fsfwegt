import axios from 'axios';

export async function createVoucherPaymentsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/voucherpayments/store?voucher_id=${values.vouchersselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editVoucherPaymentsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/voucherpayments/store?voucher_id=${values.vouchersselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllVoucherPaymentsApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/voucherpayments/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
