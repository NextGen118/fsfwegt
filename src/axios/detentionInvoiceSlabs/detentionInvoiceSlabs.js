import axios from 'axios';

export async function createDetentionInvoiceSlabsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentioninvoiceslabs/store?detention_invoice_id=${values.detentionInvoiceselect}&slab_no=${values.slab_no}&amount=${values.amount}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editDetentionInvoiceSlabsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentioninvoiceslabs/store?detention_invoice_id=${values.detentionInvoiceselect}&slab_no=${values.slab_no}&amount=${values.amount}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllDetentionInvoiceSlabsApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/detentioninvoiceslabs/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
