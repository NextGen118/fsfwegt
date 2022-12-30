import axios from 'axios';

export async function createBookingConfirmationsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/bookingconfirmations/store?date=${values.date}&booking_confirmation_number=${values.booking_confirmation_number}&client_id_shipper=${values.clientshipperselect}&client_id=${values.clientselect}&port_id_loading=${values.port_loadingselect}&port_id_discharge=${values.port_dischargeselect}&igm_india_voyage_id=${values.igmselect}&type_of_unit_id=${values.typeofselect}&vendor_id_yard=${values.vendoryardselect}&vendor_id=${values.vendorselect}&port_net_ref=${values.port_net_ref}&place_of_delivery=${values.place_of_delivery}&place_of_receipt=${values.place_of_receipt}&description=${values.description}&eta=${values.eta}&closing_date=${values.closing_date}&etd=${values.etd}&eta_pod=${values.eta_pod}&voyage_number=${values.voyage_number}&measurement=${values.measurement}&type_of_shipment=${values.type_of_shipment}&release_reference=${values.release_reference}&gross_weight=${values.gross_weight}&quantity_of_unit=${values.quantity_of_unit}&release_expire=${values.release_expire}&remarks=${values.remarks}&status_1=${values.status_1}&status_2=${values.activeselect}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function editBookingConfirmationsApiCall(values) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/bookingconfirmations/store?date=${values.date}&booking_confirmation_number=${values.booking_confirmation_number}&client_id_shipper=${values.clientshipperselect}&client_id=${values.clientselect}&port_id_loading=${values.port_loadingselect}&port_id_discharge=${values.port_dischargeselect}&igm_india_voyage_id=${values.igmselect}&type_of_unit_id=${values.typeofselect}&vendor_id_yard=${values.vendoryardselect}&vendor_id=${values.vendorselect}&port_net_ref=${values.port_net_ref}&place_of_delivery=${values.place_of_delivery}&place_of_receipt=${values.place_of_receipt}&description=${values.description}&eta=${values.eta}&closing_date=${values.closing_date}&etd=${values.etd}&eta_pod=${values.eta_pod}&voyage_number=${values.voyage_number}&measurement=${values.measurement}&type_of_shipment=${values.type_of_shipment}&release_reference=${values.release_reference}&gross_weight=${values.gross_weight}&quantity_of_unit=${values.quantity_of_unit}&release_expire=${values.release_expire}&remarks=${values.remarks}&status_1=${values.status_1}&status_2=${values.activeselect}&id=${values.id}`
        );
        return response;
    } catch (error) {
        return error;
    }
}

export async function showAllBookingConfirmationsApi() {
    try {
        const response = axios.get(`${process.env.REACT_APP_BASE_URL}/bookingconfirmations/show/all`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.resolve(error);
    }
}
