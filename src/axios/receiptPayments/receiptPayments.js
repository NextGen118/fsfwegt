import axios from 'axios';

export async function createReceiptPaymentsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/receiptpayments/store?receipt_id=${values.receiptsselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}&status=${values.activeselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editReceiptPaymentsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/receiptpayments/store?receipt_id=${values.receiptsselect}&pay_type=${values.pay_type}&cheque_no=${values.cheque_no}&cheque_date=${values.cheque_date}&current_bal=${values.current_bal}&paying_amount=${values.paying_amount}&paying_local=${values.paying_local}&status=${values.activeselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllReceiptPaymentsApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/receiptpayments/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
