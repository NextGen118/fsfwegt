import axios from 'axios';

export async function createarrivalNoticiesApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/arivalnotices/store?date=${values.date}&arrival_notice_no=${values.arrival_notice_no}&bill_of_landing_id=${values.billoflandingselect}&client_id_shipper=${values.clientshipperselect}&client_id_consignee=${values.clientconsigneeselect}&client_id=${values.clientselect}&port_id_loading=${values.port_loadingselect}&port_id_discharge=${values.port_dischargeselect}&igm_india_voyage_id=${values.igmselect}&etd_pol=${values.etd_pol}&eta_pod=${values.eta_pod}&st_expire=${values.st_expire}&ata_fpd=${values.ata_fpd}&obl_no=${values.obl_no}&shipment_type=${values.shipment_type}&hbl_no=${values.hbl_no}&carrier=${values.carrier}&nos_units=${values.nos_units}&weight=${values.weight}&vendor_id_yard=${values.vendorselect}&remarks=${values.remarks}&usd_rate=${values.usd_rate}&usd_tot=${values.usd_tot}&status=${values.activeselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editarrivalNoticiesApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/arivalnotices/store?date=${values.date}&arrival_notice_no=${values.arrival_notice_no}&bill_of_landing_id=${values.billoflandingselect}&client_id_shipper=${values.clientshipperselect}&client_id_consignee=${values.clientconsigneeselect}&client_id=${values.clientselect}&port_id_loading=${values.port_loadingselect}&port_id_discharge=${values.port_dischargeselect}&igm_india_voyage_id=${values.igmselect}&etd_pol=${values.etd_pol}&eta_pod=${values.eta_pod}&st_expire=${values.st_expire}&ata_fpd=${values.ata_fpd}&obl_no=${values.obl_no}&shipment_type=${values.shipment_type}&hbl_no=${values.hbl_no}&carrier=${values.carrier}&nos_units=${values.nos_units}&weight=${values.weight}&vendor_id_yard=${values.vendorselect}&remarks=${values.remarks}&usd_rate=${values.usd_rate}&usd_tot=${values.usd_tot}&status=${values.activeselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllArrivalNoticiesApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/arivalnotices/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
