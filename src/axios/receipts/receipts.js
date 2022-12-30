import axios from 'axios';

export async function createReceiptsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/receipts/store?date=${values.date}&receipt_no=${values.receipt_no}&description=${values.description}&client_id=${values.clientselect}&arrival_notice_id=${values.arrivalNoticeselect}&invoice_id=${values.invoicesselect}&detention_invoice_id=${values.detentionInvoiceselect}&currency_id=${values.currencyselect}&status=${values.activeselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editReceiptsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/receipts/store?date=${values.date}&receipt_no=${values.receipt_no}&description=${values.description}&client_id=${values.clientselect}&arrival_notice_id=${values.arrivalNoticeselect}&invoice_id=${values.invoicesselect}&detention_invoice_id=${values.detentionInvoiceselect}&currency_id=${values.currencyselect}&status=${values.activeselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllReceiptsApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/receipts/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
