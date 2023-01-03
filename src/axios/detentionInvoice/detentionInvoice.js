import axios from 'axios';

export async function createDetentionInvoiceApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentioninvoice/store?date=${values.date}&detention_no=${values.detention_no}&bill_of_landing_id=${values.billoflandingselect}&client_id_shipper=${values.clientshipperselect}&client_id_consignee=${values.clientconsigneeselect}&client_id=${values.clientselect}&port_id_loading=${values.port_loadingselect}&port_id_discharge=${values.port_dischargeselect}&igm_india_voyage_id=${values.igmselect}&forign_currency_id=${values.forignCurrencyselect}&tariff_id=${values.detentionTraffiesselect}&local_currency_id=${values.localCurrencyselect}&etd_pol=${values.etd_pol}&eta_pod=${values.eta_pod}&st_expire=${values.st_expire}&ata_fpd=${values.ata_fpd}&obl_no=${values.obl_no}&remarks=${values.remarks}&total_days_detention=${values.total_days_detention}&discount_type=${values.discount_type}&discount_input=${values.discount_input}&previous_bill=${values.previous_bill}&total_amount=${values.total_amount}&final_amount=${values.final_amount}&nos_units=${values.nos_units}&grand_total=${values.grand_total}&grand_total_this_invoice_unit=${values.grand_total_this_invoice_unit}&payed=${values.payed}&bl_free_days=${values.bl_free_days}&exchange_rate=${values.exchange_rate}&final_amount_tarrif=${values.final_amount_tarrif}&comm=${values.comm}&yard_suppose_date=${values.yard_suppose_date}&status=${values.activeselect}&status2=${values.status2}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editDetentionInvoiceApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/detentioninvoice/store?date=${values.date}&detention_no=${values.detention_no}&bill_of_landing_id=${values.billoflandingselect}&client_id_shipper=${values.clientshipperselect}&client_id_consignee=${values.clientconsigneeselect}&client_id=${values.clientselect}&port_id_loading=${values.port_loadingselect}&port_id_discharge=${values.port_dischargeselect}&igm_india_voyage_id=${values.igmselect}&forign_currency_id=${values.forignCurrencyselect}&tariff_id=${values.detentionTraffiesselect}&local_currency_id=${values.localCurrencyselect}&etd_pol=${values.etd_pol}&eta_pod=${values.eta_pod}&st_expire=${values.st_expire}&ata_fpd=${values.ata_fpd}&obl_no=${values.obl_no}&remarks=${values.remarks}&total_days_detention=${values.total_days_detention}&discount_type=${values.discount_type}&discount_input=${values.discount_input}&previous_bill=${values.previous_bill}&total_amount=${values.total_amount}&final_amount=${values.final_amount}&nos_units=${values.nos_units}&grand_total=${values.grand_total}&grand_total_this_invoice_unit=${values.grand_total_this_invoice_unit}&payed=${values.payed}&bl_free_days=${values.bl_free_days}&exchange_rate=${values.exchange_rate}&final_amount_tarrif=${values.final_amount_tarrif}&comm=${values.comm}&yard_suppose_date=${values.yard_suppose_date}&status=${values.activeselect}&status2=${values.status2}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllDetentionInvoiceApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/detentioninvoice/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
