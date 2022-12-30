import axios from 'axios';

export async function createArrivalNoticeChargesApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/arrivalnoticecharges/store?arrival_notice_id=${values.arrivalNoticeselect}&description=${values.description}&unit=${values.unit}&unit_cost=${values.unit_cost}&unit_charge=${values.unit_charge}&amount=${values.amount}&currency_id=${values.currencyselect}&currency_id_mycurrency=${values.myCurrencyselect}&exchange_rate=${values.exchange_rate}&amount_in=${values.amount_in}&tax_description=${values.tax_description}&tax=${values.tax}&tax_amount=${values.tax_amount}&payed=${values.payed}&amount_final=${values.amount_final}&total_cost=${values.total_cost}&total_cost_in=${values.total_cost_in}&profit=${values.profit}&profit_in=${values.profit_in}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editArrivalNoticeChargesApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/arrivalnoticecharges/store?arrival_notice_id=${values.arrivalNoticeselect}&description=${values.description}&unit=${values.unit}&unit_cost=${values.unit_cost}&unit_charge=${values.unit_charge}&amount=${values.amount}&currency_id=${values.currencyselect}&currency_id_mycurrency=${values.myCurrencyselect}&exchange_rate=${values.exchange_rate}&amount_in=${values.amount_in}&tax_description=${values.tax_description}&tax=${values.tax}&tax_amount=${values.tax_amount}&payed=${values.payed}&amount_final=${values.amount_final}&total_cost=${values.total_cost}&total_cost_in=${values.total_cost_in}&profit=${values.profit}&profit_in=${values.profit_in}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllArrivalNoticeChargesApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/arrivalnoticecharges/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
