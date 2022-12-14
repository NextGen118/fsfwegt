import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import AddTrafficmode from '../pages/trafficmode/AddTrafficmode';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));

const Equipments = React.lazy(() => import('../pages/equipments'));
const AddEquipment = React.lazy(() => import('../pages/equipments/AddEquipment'));
const EditEquipment = React.lazy(() => import('../pages/equipments/EditEqupements'));
// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const EmailInbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail/'));
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
const TaskBoard = React.lazy(() => import('../pages/apps/Tasks/Board'));
const Properties = React.lazy(() => import('../pages/Properties/index'));
const Addproperties = React.lazy(() => import('../pages/Properties/Addproperties'));
const Editproperties = React.lazy(() => import('../pages/Properties/EditProperties'));

const Timezone = React.lazy(() => import('../pages/timezones/index'));
const Addtimezone = React.lazy(() => import('../pages/timezones/AddTimezone'));
const Edittimezone = React.lazy(() => import('../pages/timezones/EditTimezone'));

const Trafficmode = React.lazy(() => import('../pages/trafficmode/index'));
const Addtrafficmode = React.lazy(() => import('../pages/trafficmode/AddTrafficmode'));
const Edittrafficmode = React.lazy(() => import('../pages/trafficmode/EditTrafficmode'));

const Typeofunit = React.lazy(() => import('../pages/typeofunit/index'));
const Addtypeofunit = React.lazy(() => import('../pages/typeofunit/AddTypeofunit'));
const Edittypeofunit = React.lazy(() => import('../pages/typeofunit/EditTypeofunit'));

// countries
const CountriesList = React.lazy(() => import('../pages/countries/index'));
// roles
const RolesList = React.lazy(() => import('../pages/roles/index'));
// currencies
const CurrenciesList = React.lazy(() => import('../pages/currencies/index'));
// access points
const AccesspointsList = React.lazy(() => import('../pages/accesspoints/index'));
// default values
const DefaultvaluesList = React.lazy(() => import('../pages/defaultvalues/index'));
// eqipment sales details
const EquipmentSaleDetailsList = React.lazy(() => import('../pages/equipmentSaleDetails/index'));

const SwapsList = React.lazy(() => import('../pages/swap/index'));
// swaps Histories
const SwaphistoriesList = React.lazy(() => import('../pages/swapHistories/index'));

//const Propertieslist = React.lazy(() => import('../pages/properties/index'));

// clients
const ClientsList = React.lazy(() => import('../pages/clients/index'));
const AddClients = React.lazy(() => import('../pages/clients/addClients'));
const EditClients = React.lazy(() => import('../pages/clients/editClients'));

//bill of landing
const BilloflandingsList = React.lazy(() => import('../pages/bill_of_landing/index'));
const AddBilloflandings = React.lazy(() => import('../pages/bill_of_landing/addBillOfLanding'));
const EditdBilloflandings = React.lazy(() => import('../pages/bill_of_landing/editBillOfLanding'));

//bill of landing switches
const Billoflandings_switchesList = React.lazy(() => import('../pages/bill_of_landing_switches/index'));
const AddBilloflandings_switches = React.lazy(() =>
    import('../pages/bill_of_landing_switches/addBillOfLanding_switches')
);
const EditdBilloflandings_switches = React.lazy(() =>
    import('../pages/bill_of_landing_switches/editBillOfLanding_switches')
);

//bill of landing non inventories
const Billoflandings_non_inventoriesList = React.lazy(() => import('../pages/bill_of_landing_non_inventories/index'));
const AddBilloflandings_non_inventories = React.lazy(() =>
    import('../pages/bill_of_landing_non_inventories/addBillOfLanding_non_inventories')
);
const EditdBilloflandings_non_inventories = React.lazy(() =>
    import('../pages/bill_of_landing_non_inventories/editBillOfLanding_non_inventories')
);

//bill of landing subs
const BilloflandingsubsList = React.lazy(() => import('../pages/bill_of_landing_subs/index'));
const AddBilloflandingsubs = React.lazy(() => import('../pages/bill_of_landing_subs/addBillOfLandingSubs'));
const EditdBilloflandingsubs = React.lazy(() => import('../pages/bill_of_landing_subs/editBillOfLandingSubs'));

//bill of landing sub switches
const BilloflandingsubswitchesList = React.lazy(() => import('../pages/bill_of_landing_subs_switches/index'));
const AddBilloflandingsubswitches = React.lazy(() =>
    import('../pages/bill_of_landing_subs_switches/addBillOfLandingSubswitches')
);
const EditdBilloflandingsubswitches = React.lazy(() =>
    import('../pages/bill_of_landing_subs_switches/editBillOfLandingSubswitces')
);

//bill of landing subs non invenrtories
const Billoflandingsubs_non_inventoriesList = React.lazy(() =>
    import('../pages/bill_of_landing_subs_non_inventories/index')
);
const AddBilloflandingsubs_non_inventories = React.lazy(() =>
    import('../pages/bill_of_landing_subs_non_inventories/addBillOfLandingSubs_non_inventories')
);
const EditdBilloflandingsubs_non_inventories = React.lazy(() =>
    import('../pages/bill_of_landing_subs_non_inventories/editBillOfLandingSubs_non_inventories')
);

//Receipts
const ReceiptsList = React.lazy(() => import('../pages/receipts/index'));
const AddReceipts = React.lazy(() => import('../pages/receipts/addReceipts'));
const EditReceipts = React.lazy(() => import('../pages/receipts/editReceipts'));

//Receipt Payments
const ReceiptPaymentsList = React.lazy(() => import('../pages/receiptPayments/index'));
const AddReceiptPayments = React.lazy(() => import('../pages/receiptPayments/addReceiptPayments'));
const EditReceiptPayments = React.lazy(() => import('../pages/receiptPayments/editReceiptPayments'));

//Vouchers
const VouchersList = React.lazy(() => import('../pages/vouchers/index'));
const AddVouchers = React.lazy(() => import('../pages/vouchers/addVouchers'));
const EditVouchers = React.lazy(() => import('../pages/vouchers/editVouchers'));

//Voucher Payments
const VoucherPaymentsList = React.lazy(() => import('../pages/voucherPayments/index'));
const AddVoucherPayments = React.lazy(() => import('../pages/voucherPayments/addVoucherPayments'));
const EditVoucherPayments = React.lazy(() => import('../pages/voucherPayments/editVoucherPayments'));

//Invoices
const InvoicesList = React.lazy(() => import('../pages/invoices/index'));
const AddInvoices = React.lazy(() => import('../pages/invoices/AddInvoices'));
const EditInvoices = React.lazy(() => import('../pages/invoices/editInvoices'));

//Invoices Charges
const InvoiceChargesList = React.lazy(() => import('../pages/invoiceCharges/index'));
const AddInvoiceCharges = React.lazy(() => import('../pages/invoiceCharges/addInvoiceCharges'));
const EditInvoiceCharges = React.lazy(() => import('../pages/invoiceCharges/editInvoiceCharges'));

//Vendors
const VendorsList = React.lazy(() => import('../pages/vendor/index'));
const AddVendors = React.lazy(() => import('../pages/vendor/addVendor'));
const EditVendors = React.lazy(() => import('../pages/vendor/editVendor'));

//ArrivalNoticies
const ArrivalNoticiesList = React.lazy(() => import('../pages/arrivalNoticies/index'));
const AddArrivalNoticies = React.lazy(() => import('../pages/arrivalNoticies/addArrivalNoticies'));
const EditArrivalNoticies = React.lazy(() => import('../pages/arrivalNoticies/editArrivalNoticies'));

//ArrivalNoticeCharges
const ArrivalNoticeChargesList = React.lazy(() => import('../pages/arrivalNoticiesCharges/index'));
const AddArrivalNoticeCharges = React.lazy(() => import('../pages/arrivalNoticiesCharges/addArrivalNoticeCharges'));
const EditArrivalNoticeCharges = React.lazy(() => import('../pages/arrivalNoticiesCharges/editArrivalNoticeCharges'));

//ArrivalNoticeContainers
const ArrivalNoticeContainersList = React.lazy(() => import('../pages/arrivalNoticeContainers/index'));
const AddArrivalNoticeContainers = React.lazy(() =>
    import('../pages/arrivalNoticeContainers/AddArrivalNoticeContainers')
);
const EditArrivalNoticeContainers = React.lazy(() =>
    import('../pages/arrivalNoticeContainers/editArrivalNoticeContainers')
);

//BookingConfirmations
const BookingConfirmationsList = React.lazy(() => import('../pages/bookingConfirmations/index'));
const AddBookingConfirmations = React.lazy(() => import('../pages/bookingConfirmations/addBookingConfirmations'));
const EditBookingConfirmations = React.lazy(() => import('../pages/bookingConfirmations/editBookingConfirmations'));

//DetentionInvoices
const DetentionInvoicesList = React.lazy(() => import('../pages/detentionInvoice/index'));
const AddDetentionInvoices = React.lazy(() => import('../pages/detentionInvoice/AddDetentionInvoices'));
const EditDetentionInvoices = React.lazy(() => import('../pages/detentionInvoice/editDetentionInvoices'));

//DetentionInvoices Containers
const DetentionInvoiceContainersList = React.lazy(() => import('../pages/detentionInvoiceContainers/index'));
const AddDetentionInvoiceContainers = React.lazy(() =>
    import('../pages/detentionInvoiceContainers/AddDetentionInvoiceContainers')
);
const EditDetentionInvoiceContainers = React.lazy(() =>
    import('../pages/detentionInvoiceContainers/editDetentionInvoiceContainers')
);

//DetentionInvoices Slabs
const DetentionInvoiceSlabsList = React.lazy(() => import('../pages/detentionInvoiceSlabs/index'));
const AddDetentionInvoiceSlabs = React.lazy(() => import('../pages/detentionInvoiceSlabs/addDetentionInvoiceSlabs'));
const EditDetentionInvoiceSlabs = React.lazy(() => import('../pages/detentionInvoiceSlabs/editDetentionInvoiceSlabs'));

const Port = React.lazy(() => import('../pages/Port/index'));

const Owner = React.lazy(() => import('../pages/owner/index'));
const OwnerAdd = React.lazy(() => import('../pages/owner/AddOwner'));
const EditOwner = React.lazy(() => import('../pages/owner/editOwner'));

//DetentionTraffies
const DetentionTraffiesList = React.lazy(() => import('../pages/detentionTraffies/index'));
const AddDetentionTraffies = React.lazy(() => import('../pages/detentionTraffies/addDetentionTraffies'));
const EditDetentionTraffies = React.lazy(() => import('../pages/detentionTraffies/editDetentionTraffies'));

//DetentionTraffSubs
const DetentionTraffSubsList = React.lazy(() => import('../pages/detentionTraffSubs/index'));
const AddDetentionTraffSubs = React.lazy(() => import('../pages/detentionTraffSubs/addDetentionTraffSubs'));
const EditDetentionTraffSubs = React.lazy(() => import('../pages/detentionTraffSubs/editDetentionTraffSubs'));

// pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile/'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));

// ui
const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// charts
const Charts = React.lazy(() => import('../pages/charts/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.role) === -1) {
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/equipments" />,
    route: PrivateRoute,
};

const ownerRoutes = {
    path: '/owner',
    name: 'Owner',
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],
    route: PrivateRoute,
    component: Owner,
};

const ownerAddRotes = {
    path: '/owner-add',
    name: 'Owner Ad',
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],
    route: PrivateRoute,
    component: OwnerAdd,
};
const ownerEditRotes = {
    path: '/owner-edit/:id',
    name: 'Owner Edit',
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],
    route: PrivateRoute,
    component: EditOwner,
};

/**************** Receipts ************/

const receiptsRoutes = {
    path: '/receipts',
    name: 'Receipts',
    component: ReceiptsList,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const addreceiptsRoutes = {
    path: '/add-receipts',
    name: 'Add Receipts',
    component: AddReceipts,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editreceiptsRoutes = {
    path: '/edit-receipts/:id',
    name: 'Edit Receipts',
    component: EditReceipts,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Receipt Payments
const receiptPaymentsRoutes = {
    path: '/receiptPayments',
    name: 'Receipt Payments',
    icon: FeatherIcon.FileText,
    route: PrivateRoute,
    component: ReceiptPaymentsList,
    roles: ['Admin'],
};
const addreceiptPaymentsRoutes = {
    path: '/add-receiptPayments',
    name: 'Add Receipt Payments',
    component: AddReceiptPayments,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editreceiptPaymentsRoutes = {
    path: '/edit-receiptPayments/:id',
    name: 'Edit Receipt Payments',
    component: EditReceiptPayments,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

const receiptRoutes = {
    name: 'Receipts',
    icon: FeatherIcon.FileText,
    route: PrivateRoute,
    children: [
        {
            path: '/receipts',
            name: 'Receipts',
            route: PrivateRoute,
            component: ReceiptsList,
        },
        {
            path: '/receiptPayments',
            name: 'Receipt Payments',
            route: PrivateRoute,
            component: ReceiptPaymentsList,
        },
    ],
};

/****************   End Receipt  ***************/

/****************   Voucher ***************/

const vouchersRoutes = {
    path: '/vouchers',
    name: 'Vouchers',
    component: VouchersList,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const addvouchersRoutes = {
    path: '/add-vouchers',
    name: 'Add Vouchers',
    component: AddVouchers,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editvouchersRoutes = {
    path: '/edit-vouchers/:id',
    name: 'Edit Vouchers',
    component: EditVouchers,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Voucher Payments
const voucherPaymentsRoutes = {
    path: '/voucherPayments',
    name: 'Voucher Payments',
    icon: FeatherIcon.CreditCard,
    route: PrivateRoute,
    component: VoucherPaymentsList,
    roles: ['Admin'],
};
const addvoucherPaymentsRoutes = {
    path: '/add-voucherPayments',
    name: 'Add Voucher Payments',
    component: AddVoucherPayments,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editvoucherPaymentsRoutes = {
    path: '/edit-voucherpayments/:id',
    name: 'Edit Voucher Payments',
    component: EditVoucherPayments,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Vouchers
const voucherRoutes = {
    name: 'Vouchers',
    icon: FeatherIcon.CreditCard,
    route: PrivateRoute,
    children: [
        {
            path: '/vouchers',
            name: 'Vouchers',
            route: PrivateRoute,
            component: VouchersList,
        },
        {
            path: '/voucherPayments',
            name: 'Voucher Payments',
            route: PrivateRoute,
            component: VoucherPaymentsList,
        },
    ],
};
/****************  End Voucher ***************/

/****************  Arrival Notice ***************/

const arrivalNoticiesRoutes = {
    path: '/arrivalNoticies',
    name: 'Arrival Noticies',
    component: ArrivalNoticiesList,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const addarrivalNoticiesRoutes = {
    path: '/add-arrivalNoticies',
    name: 'Add Arrival Noticies',
    component: AddArrivalNoticies,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editarrivalNoticiesRoutes = {
    path: '/edit-arrivalNoticies/:id',
    name: 'Edit Arrival Noticies',
    component: EditArrivalNoticies,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Arrival Noticies Charges
const arrivalNoticeChargesRoutes = {
    path: '/arrivalNoticeCharges',
    name: 'Arrival Notice Charges',
    component: ArrivalNoticeChargesList,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const addarrivalNoticeChargesRoutes = {
    path: '/add-arrivalNoticeCharges',
    name: 'Add Arrival Notice Charges',
    component: AddArrivalNoticeCharges,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editarrivalNoticeChargesRoutes = {
    path: '/edit-arrivalNoticeCharges/:id',
    name: 'Edit Arrival Notice Charges',
    component: EditArrivalNoticeCharges,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//arrival Notice Containers
const arrivalNoticeContainersRoutes = {
    path: '/arrivalNoticeContainers',
    name: 'Arrival Notice Containers',
    component: ArrivalNoticeContainersList,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const addarrivalNoticeContainersRoutes = {
    path: '/add-arrivalNoticeContainers',
    name: 'Add Arrival Notice Containers',
    component: AddArrivalNoticeContainers,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editarrivalNoticeContainersRoutes = {
    path: '/edit-arrivalNoticeContainers/:id',
    name: 'Edit Arrival Notice Containers',
    component: EditArrivalNoticeContainers,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

const arrivalNoticieRoutes = {
    name: 'Arrival Noticies',
    icon: FeatherIcon.File,
    route: PrivateRoute,
    children: [
        {
            path: '/arrivalNoticies',
            name: 'Arrival Noticies',
            route: PrivateRoute,
            component: ArrivalNoticiesList,
        },
        {
            path: '/arrivalNoticeCharges',
            name: 'Arrival Notice Charges',
            route: PrivateRoute,
            component: ArrivalNoticeChargesList,
        },
        {
            path: '/arrivalNoticeContainers',
            name: 'Arrival Notice Containers',
            route: PrivateRoute,
            component: ArrivalNoticeContainersList,
        },
    ],
};

/**************** End Arrival Notice ***************/

/**************** Booking Confirmations ***************/

const bookingConfirmationsRoutes = {
    path: '/bookingConfirmations',
    name: 'Booking Confirmations',
    icon: FeatherIcon.File,
    route: PrivateRoute,
    component: BookingConfirmationsList,
    roles: ['Admin'],
};

const addBookingConfirmationsRoutes = {
    path: '/add-bookingConfirmations',
    name: 'Add Booking Confirmations',
    component: AddBookingConfirmations,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editBookingConfirmationsRoutes = {
    path: '/edit-bookingConfirmations/:id',
    name: 'Edit Booking Confirmations',
    component: EditBookingConfirmations,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

/**************** End Booking Confirmations ***************/

/****************  Invoice *************/

//Invoice
const invoicesRoutes = {
    path: '/invoices',
    name: 'Invoices',
    icon: FeatherIcon.File,
    route: PrivateRoute,
    component: InvoicesList,
    roles: ['Admin'],
};
const addinvoicesRoutes = {
    path: '/add-invoices',
    name: 'Add Invoices',
    component: AddInvoices,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editinvoicesRoutes = {
    path: '/edit-invoices/:id',
    name: 'Edit Invoices',
    component: EditInvoices,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Invoices Charges
const invoiceChargesRoutes = {
    path: '/invoiceCharges',
    name: 'Invoice Charges',
    icon: FeatherIcon.File,
    route: PrivateRoute,
    component: InvoiceChargesList,
    roles: ['Admin'],
};
const addinvoiceChargesRoutes = {
    path: '/add-invoiceCharges',
    name: 'Add Invoice Charges',
    component: AddInvoiceCharges,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editinvoiceChargesRoutes = {
    path: '/edit-invoiceCharges/:id',
    name: 'Edit Invoice Charges',
    component: EditInvoiceCharges,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

const invoiceRoutes = {
    name: 'Invoices',
    icon: FeatherIcon.File,
    route: PrivateRoute,
    roles: ['Admin'],
    children: [
        {
            path: '/invoices',
            name: 'Invoices',
            route: PrivateRoute,
            component: InvoicesList,
        },
        {
            path: '/invoiceCharges',
            name: 'Invoice Charges',
            route: PrivateRoute,
            component: InvoiceChargesList,
        },
    ],
};
/******************* End Invoice **********************/

/******************* Detention **********************/

//Detention Invoices
const detentionInvoicesRoutes = {
    path: '/detentionInvoices',
    name: 'Detention Invoices',
    icon: FeatherIcon.CreditCard,
    route: PrivateRoute,
    component: DetentionInvoicesList,
    roles: ['Admin'],
};
const adddetentionInvoicesRoutes = {
    path: '/add-detentionInvoices',
    name: 'Add Detention Invoices',
    component: AddDetentionInvoices,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editdetentionInvoicesRoutes = {
    path: '/edit-detentionInvoices/:id',
    name: 'Edit Detention Invoices',
    component: EditDetentionInvoices,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//detention Invoice Containers
const detentionInvoiceContainersRoutes = {
    path: '/detentionInvoiceContainers',
    name: 'Detention Invoice Containers',
    icon: FeatherIcon.CreditCard,
    route: PrivateRoute,
    component: DetentionInvoiceContainersList,
    roles: ['Admin'],
};
const adddetentionInvoiceContainersRoutes = {
    path: '/add-detentionInvoiceContainers',
    name: 'Add Detention Invoice Containers',
    component: AddDetentionInvoiceContainers,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editdetentionInvoiceContainersRoutes = {
    path: '/edit-detentionInvoiceContainers/:id',
    name: 'Edit Detention Invoice Containers',
    component: EditDetentionInvoiceContainers,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//detention Invoice Slabs
const detentionInvoiceSlabsRoutes = {
    path: '/detentionInvoiceSlabs',
    name: 'Detention Invoice Slabs',
    icon: FeatherIcon.CreditCard,
    route: PrivateRoute,
    component: DetentionInvoiceSlabsList,
    roles: ['Admin'],
};
const adddetentionInvoiceSlabsRoutes = {
    path: '/add-detentionInvoiceSlabs',
    name: 'Add Detention Invoice Slabs',
    component: AddDetentionInvoiceSlabs,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editdetentionInvoiceSlabsRoutes = {
    path: '/edit-detentionInvoiceSlabs/:id',
    name: 'Edit Detention Invoice Slabs',
    component: EditDetentionInvoiceSlabs,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Detention Traffies
const detentionTraffiesRoutes = {
    path: '/detentionTraffies',
    name: 'Detention Traffies',
    icon: FeatherIcon.CreditCard,
    route: PrivateRoute,
    component: DetentionTraffiesList,
    roles: ['Admin'],
};
const adddetentionTraffiesRoutes = {
    path: '/add-detentionTraffies',
    name: 'Add Detention Traffies',
    component: AddDetentionTraffies,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editdetentionTraffiesRoutes = {
    path: '/edit-detentionTraffies/:id',
    name: 'Edit Detention Traffies',
    component: EditDetentionTraffies,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Detention Traff Subs
const detentionTraffSubsRoutes = {
    path: '/detentionTraffSubs',
    name: 'Detention Traff Subs',
    icon: FeatherIcon.CreditCard,
    route: PrivateRoute,
    component: DetentionTraffSubsList,
    roles: ['Admin'],
};
const adddetentionTraffSubsRoutes = {
    path: '/add-detentionTraffSubs',
    name: 'Add Detention Traff Subs',
    component: AddDetentionTraffSubs,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editdetentionTraffSubsRoutes = {
    path: '/edit-detentionTraffSubs/:id',
    name: 'Edit Detention Traff Subs',
    component: EditDetentionTraffSubs,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const detentionRoutes = {
    name: 'Detention',
    icon: FeatherIcon.File,
    route: PrivateRoute,
    roles: ['Admin'],
    children: [
        {
            path: '/detentionInvoices',
            name: 'Detention Invoices',
            route: PrivateRoute,
            component: DetentionInvoicesList,
        },
        {
            path: '/detentionInvoiceContainers',
            name: 'Detention Invoice Containers',
            route: PrivateRoute,
            component: DetentionInvoiceContainersList,
        },
        {
            path: '/detentionInvoiceSlabs',
            name: 'Detention Invoice Slabs',
            route: PrivateRoute,
            component: DetentionInvoiceSlabsList,
        },
        {
            path: '/detentionTraffies',
            name: 'Detention Traffies',
            route: PrivateRoute,
            component: DetentionTraffiesList,
        },
        {
            path: '/detentionTraffSubs',
            name: 'Detention Traff Subs',
            route: PrivateRoute,
            component: DetentionTraffSubsList,
        },
    ],
};

/******************* Detention **********************/

// dashboards
// const dashboardRoutes = {
//     path: '/dashboard',
//     name: 'Dashboard',
//     icon: FeatherIcon.Home,
//     // header: 'Navigation',
//     // badge: {
//     //     variant: 'success',
//     //     text: '1',
//     // },
//     component: Dashboard,
//     roles: ['Admin'],
//     route: PrivateRoute,
// };

const equipmentsRoutes = {
    path: '/equipments',
    name: 'Equipments',
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],
    route: PrivateRoute,
    component: Equipments
    // children: [
    //     {
    //         path: '/equipments',
    //         name: 'List',
    //         component: Equipments,
    //         route: PrivateRoute,
    //     }
    //     // {
    //     //     path: '/add-equipments',
    //     //     name: 'Add Equipment',
    //     //     component: AddEquipment,
    //     //     route: PrivateRoute,
    //     // },
    // ],
};

const AddEquipmentRotes = {
    path: '/add-equipments',
    name: 'Add Equipment',
    component: AddEquipment,
    route: PrivateRoute,
}
//Countries
const countriesRoutes = {
    path: '/countries',
    name: 'Countries',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: CountriesList,
    roles: ['Admin'],
};

//Roles
const rolesRoutes = {
    path: '/roles',
    name: 'Roles',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: RolesList,
    roles: ['Admin'],
};

//Currencies
const currenciesRoutes = {
    path: '/currencies',
    name: 'Currencies',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: CurrenciesList,
    roles: ['Admin'],
};

//Accesspoints
const accesspointsRoutes = {
    path: '/accesspoints',
    name: 'Accesspoints',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: AccesspointsList,
    roles: ['Admin'],
};

//DefaulfValues
const defaultvaluesRoutes = {
    path: '/defaultvalues',
    name: 'Defaultvalues',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: DefaultvaluesList,
    roles: ['Admin'],
};

//EquipmentSaleDetails
const equipmentsaledetailsRoutes = {
    path: '/equipmentsaledetails',
    name: 'Equipment Sale Details',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: EquipmentSaleDetailsList,
    roles: ['Admin'],
};

//Swaps
const swapsRoutes = {
    path: '/swaps',
    name: 'Swaps Details',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: SwapsList,
    roles: ['Admin'],
};

//Swaps Histories
const swaphistoriesRoutes = {
    path: '/swaphistories',
    name: 'SwapHistories Details',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: SwaphistoriesList,
    roles: ['Admin'],
};

//Clients
const clientsRoutes = {
    path: '/clients',
    name: 'Clients',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: ClientsList,
    roles: ['Admin'],
};
const addclientsRoutes = {
    path: '/add-clients',
    name: 'Add Client',
    component: AddClients,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editclientsRoutes = {
    path: '/edit-clients/:id',
    name: 'Edit Client',
    component: EditClients,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Vendors
const vendorsRoutes = {
    path: '/vendors',
    name: 'Vendors',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: VendorsList,
    roles: ['Admin'],
};
const addvendorsRoutes = {
    path: '/add-vendors',
    name: 'Add Vendors',
    component: AddVendors,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const editvendorsRoutes = {
    path: '/edit-vendors/:id',
    name: 'Edit Vendor',
    component: EditVendors,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Bill of landing
const bill_of_landingRoutes = {
    path: '/billoflandings',
    name: 'Bill of landing',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: BilloflandingsList,
    roles: ['Admin'],
};
const add_bill_of_landingRoutes = {
    path: '/add-billoflandings',
    name: 'Add Bill of landing',
    component: AddBilloflandings,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const edit_bill_of_landingRoutes = {
    path: '/edit-billoflandings/:id',
    name: 'Edit Bill of landing',
    component: EditdBilloflandings,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Bill of landing switches
const bill_of_landing_switchesRoutes = {
    path: '/billoflandingswitches',
    name: 'Bill of landing switches',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: Billoflandings_switchesList,
    roles: ['Admin'],
};
const add_bill_of_landing_switchesRoutes = {
    path: '/add-billoflandingswitches',
    name: 'Add Bill of landing switch',
    component: AddBilloflandings_switches,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const edit_bill_of_landing_switchesRoutes = {
    path: '/edit-billoflandingswitches/:id',
    name: 'Edit Bill of landing switch',
    component: EditdBilloflandings_switches,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Bill of landing non inventories
const bill_of_landing_non_inventoriesRoutes = {
    path: '/billoflandingnoninventories',
    name: 'Bill of landing non inventories',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: Billoflandings_non_inventoriesList,
    roles: ['Admin'],
};
const add_bill_of_landing_non_inventoriesRoutes = {
    path: '/add-billoflandingnoninventories',
    name: 'Add Bill of landing non inventory',
    component: AddBilloflandings_non_inventories,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const edit_bill_of_landing_non_inventoriesRoutes = {
    path: '/edit-billoflandingnoninventories/:id',
    name: 'Edit Bill of landing non inventory',
    component: EditdBilloflandings_non_inventories,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Bill of landing subs
const bill_of_landing_subsRoutes = {
    path: '/billoflandingsubs',
    name: 'Bill of landing subs',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: BilloflandingsubsList,
    roles: ['Admin'],
};
const add_bill_of_landing_subsRoutes = {
    path: '/add-billoflandingsubs',
    name: 'Add Bill of landing sub',
    component: AddBilloflandingsubs,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const edit_bill_of_landing_subsRoutes = {
    path: '/edit-billoflandingsubs/:id',
    name: 'Edit Bill of landing sub',
    component: EditdBilloflandingsubs,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Bill of landing sub switches
const bill_of_landing_subswitchesRoutes = {
    path: '/billoflandingsubswitches',
    name: 'Bill of landing sub switches',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: BilloflandingsubswitchesList,
    roles: ['Admin'],
};
const add_bill_of_landing_subswitchesRoutes = {
    path: '/add-billoflandingsubswitches',
    name: 'Add Bill of landing sub switch',
    component: AddBilloflandingsubswitches,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const edit_bill_of_landing_subswitchesRoutes = {
    path: '/edit-billoflandingsubswitches/:id',
    name: 'Edit Bill of landing sub switch',
    component: EditdBilloflandingsubswitches,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Bill of landing subs non inventories
const bill_of_landing_subs_non_inventoriesRoutes = {
    path: '/billoflandingsubnoninventories',
    name: 'Bill of landing sub non inventories',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    component: Billoflandingsubs_non_inventoriesList,
    roles: ['Admin'],
};
const add_bill_of_landing_subs_non_inventoriesRoutes = {
    path: '/add-billoflandingsubnoninventories',
    name: 'Add Bill of landing sub non inventory',
    component: AddBilloflandingsubs_non_inventories,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};
const edit_bill_of_landing_subs_non_inventoriesRoutes = {
    path: '/edit-billoflandingsubnoninventories/:id',
    name: 'Edit Bill of landing sub non inventory',
    component: EditdBilloflandingsubs_non_inventories,
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
};

//Bill
const exportRoutes = {
    name: 'Export',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
    children: [
        {
            path: '/billoflandings',
            name: 'Bill of Lading',
            component: BilloflandingsList,
            route: PrivateRoute,
        },

        {
            path: '/billoflandingsubs',
            name: 'Sub BL',
            component: BilloflandingsubsList,
            route: PrivateRoute,
        },
        {
            path: '/billoflandingswitches',
            name: 'Switch BL',
            component: Billoflandings_switchesList,
            route: PrivateRoute,
        },

        {
            path: '/billoflandingsubswitches',
            name: 'Sub Switch BL',
            route: PrivateRoute,
            component: Billoflandingsubs_non_inventoriesList,
        },
        {
            path: '/billoflandingnoninventories',
            name: 'Non-Inventory BL',
            component: Billoflandings_non_inventoriesList,
            route: PrivateRoute,
        },
        {
            path: '/billoflandingsubnoninventories',
            name: 'Sub Non-Inventory BL',
            route: PrivateRoute,
            component: Billoflandingsubs_non_inventoriesList,
        },
    ],
};

const editeuipment = {
    path: '/edit-equipments/:id',
    name: 'Edit Equipments',
    component: EditEquipment,
    route: PrivateRoute,
    roles: ['Admin'],
};

const PropertiesRoutes = {
    path: '/properties',
    name: 'Properties',
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],
    route: PrivateRoute,

    children: [
        {
            path: '/properties',
            name: 'List',
            component: Properties,
            route: PrivateRoute,
        },
        {
            path: '/add-properties',
            name: 'Add Properties',
            component: Addproperties,
            route: PrivateRoute,
        },
        {
            path: '/edit-properties/:id',
            name: 'Edit Properties',
            component: Editproperties,
            route: PrivateRoute,
        },
    ],
};

const TimezoneRoutes = {
    path: '/timezone',
    name: 'Timezone',
    route: PrivateRoute,
    component: Timezone,
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],

    children: [
        {
            path: '/timezone',
            name: 'List',
            component: Timezone,
            route: PrivateRoute,
        },
        {
            path: '/add-timezone',
            name: 'Add Timezone',
            component: Addtimezone,
            route: PrivateRoute,
        },
        {
            path: '/edit-timezone/:id',
            name: 'Edit Timezone',
            component: Edittimezone,
            route: PrivateRoute,
        },
    ],
};

const TrafficmodeRoutes = {
    path: '/trafficmode',
    name: 'Traffixmode',
    route: PrivateRoute,
    component: Trafficmode,
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],

    children: [
        {
            path: '/trafficmode',
            name: 'List',
            component: Trafficmode,
            route: PrivateRoute,
        },
        {
            path: '/add-trafficmode',
            name: 'Add Trafficmode',
            component: AddTrafficmode,
            route: PrivateRoute,
        },
        {
            path: '/edit-trafficmode/:id',
            name: 'Edit Trafficmode',
            component: Edittrafficmode,
            route: PrivateRoute,
        },
    ],
};

const TypeofunitRoutes = {
    path: '/typeofunit',
    name: 'Typeofunit',
    route: PrivateRoute,
    component: Typeofunit,
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],

    children: [
        {
            path: '/typeofunit',
            name: 'List',
            component: Typeofunit,
            route: PrivateRoute,
        },
        {
            path: '/add-typeofunit',
            name: 'Add Type of unit',
            component: Addtypeofunit,
            route: PrivateRoute,
        },
        {
            path: '/edit-typeofunit/:id',
            name: 'Edit Typeofunit',
            component: Edittypeofunit,
            route: PrivateRoute,
        },
    ],
};

const PortRoutes = {
    path: '/port',
    name: 'Port',
    route: PrivateRoute,
    component: Port,
    icon: FeatherIcon.Anchor,
    roles: ['Admin'],

    children: [
        {
            path: '/port',
            name: 'List',
            component: Port,
            route: PrivateRoute,
        },
    ],
};

const Master = {
    route: PrivateRoute,
    icon: FeatherIcon.Anchor,
    name: 'Master',
    roles: ['Admin'],

    children: [
        {
            path: '/port',
            name: 'Port',
            component: Port,
            route: PrivateRoute,
        },
        {
            path: '/typeofunit',
            name: 'Type of unit',
            component: Typeofunit,
            route: PrivateRoute,
        },
        {
            path: '/timezone',
            name: 'Time zone',
            component: Timezone,
            route: PrivateRoute,
        },
        {
            path: '/trafficmode',
            name: 'Traffic mode',
            component: Trafficmode,
            route: PrivateRoute,
        },
        {
            path: '/properties',
            name: 'Properties',
            component: Properties,
            route: PrivateRoute,
        },
        {
            path: '/countries',
            name: 'Countries',
            component: CountriesList,
            route: PrivateRoute,
        },
        {
            path: '/currencies',
            name: 'Currencies',
            component: CurrenciesList,
            route: PrivateRoute,
        },
        {
            path: '/swaps',
            name: 'Swaps',
            component: SwapsList,
            route: PrivateRoute,
        },
        {
            path: '/swaphistories',
            name: 'Swap Histories',
            component: SwaphistoriesList,
            route: PrivateRoute,
        },

        {
            path: '/accesspoints',
            name: 'Accesspoints',
            component: AccesspointsList,
            route: PrivateRoute,
        },

        {
            path: '/defaultvalues',
            name: 'Default value',
            component: DefaultvaluesList,
            route: PrivateRoute,
        },
    ],
};
// apps

const calendarAppRoutes = {
    path: '/apps/calendar',
    name: 'Calendar',
    header: 'Apps',
    icon: FeatherIcon.Calendar,
    component: CalendarApp,
    route: PrivateRoute,
    roles: ['Admin'],
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    icon: FeatherIcon.Inbox,
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: EmailInbox,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/email/details',
            name: 'Details',
            component: EmailDetail,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/email/compose',
            name: 'Compose',
            component: EmailCompose,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

//Client master router
const clientmasterRoutes = {
    name: 'Clients',
    icon: FeatherIcon.Anchor,
    route: PrivateRoute,
    roles: ['Admin'],
    children: [
        {
            path: '/clients',
            name: 'Clients Master',
            component: ClientsList,
            route: PrivateRoute,
        },
        {
            path: '/vendors',
            name: 'Vendors Master',
            component: VendorsList,
            route: PrivateRoute,
        },
    ],
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    icon: FeatherIcon.Briefcase,
    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: ProjectList,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/projects/detail',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    icon: FeatherIcon.Bookmark,
    children: [
        {
            path: '/apps/tasks/list',
            name: 'List',
            component: TaskList,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/tasks/board',
            name: 'Board',
            component: TaskBoard,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

const appRoutes = [calendarAppRoutes, emailAppRoutes, projectAppRoutes, taskAppRoutes];

// pages
const pagesRoutes = {
    path: '/pages',
    name: 'Pages',
    header: 'Custom',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/activity',
            name: 'Activity',
            component: Activity,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/error-404',
            name: 'Error 404',
            component: Error404,
            route: Route,
        },
        {
            path: '/pages/error-500',
            name: 'Error 500',
            component: Error500,
            route: Route,
        },
    ],
};

// components
const componentsRoutes = {
    path: '/ui',
    name: 'UI Elements',
    header: 'Components',
    icon: FeatherIcon.Package,
    children: [
        {
            path: '/ui/bscomponents',
            name: 'Bootstrap UI',
            component: BSComponents,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/feather',
                    name: 'Feather Icons',
                    component: FeatherIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons Icons',
                    component: UniconsIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
            ],
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

// charts
const chartRoutes = {
    path: '/charts',
    name: 'Charts',
    component: Charts,
    icon: FeatherIcon.PieChart,
    roles: ['Admin'],
    route: PrivateRoute,
};

// forms
const formsRoutes = {
    path: '/forms',
    name: 'Forms',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/forms/basic',
            name: 'Basic Elements',
            component: BasicForms,
            route: PrivateRoute,
        },
        {
            path: '/forms/advanced',
            name: 'Advanced',
            component: FormAdvanced,
            route: PrivateRoute,
        },
        {
            path: '/forms/validation',
            name: 'Validation',
            component: FormValidation,
            route: PrivateRoute,
        },
        {
            path: '/forms/wizard',
            name: 'Wizard',
            component: FormWizard,
            route: PrivateRoute,
        },
        {
            path: '/forms/editor',
            name: 'Editor',
            component: Editor,
            route: PrivateRoute,
        },
        {
            path: '/forms/upload',
            name: 'File Upload',
            component: FileUpload,
            route: PrivateRoute,
        },
    ],
};

const tableRoutes = {
    path: '/tables',
    name: 'Tables',
    icon: FeatherIcon.Grid,
    children: [
        {
            path: '/tables/basic',
            name: 'Basic',
            component: BasicTables,
            route: PrivateRoute,
        },
        {
            path: '/tables/advanced',
            name: 'Advanced',
            component: AdvancedTables,
            route: PrivateRoute,
        },
    ],
};

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    AddEquipmentRotes,
    //dashboardRoutes,
    equipmentsRoutes,
    ...appRoutes,
    pagesRoutes,
    componentsRoutes,
    chartRoutes,
    formsRoutes,
    tableRoutes,
    authRoutes,
    PropertiesRoutes,
    TimezoneRoutes,
    TrafficmodeRoutes,
    TypeofunitRoutes,
    PortRoutes,
    ownerRoutes,
    ownerAddRotes,
    ownerEditRotes,
    //receipts
    receiptsRoutes,
    editreceiptsRoutes,
    addreceiptsRoutes,
    receiptPaymentsRoutes,
    addreceiptPaymentsRoutes,
    editreceiptPaymentsRoutes,
    //Voucher
    vouchersRoutes,
    addvouchersRoutes,
    editvouchersRoutes,
    voucherPaymentsRoutes,
    addvoucherPaymentsRoutes,
    editvoucherPaymentsRoutes,
    //Booking Confirmations
    bookingConfirmationsRoutes,
    addBookingConfirmationsRoutes,
    editBookingConfirmationsRoutes,
    //invoice
    invoicesRoutes,
    addinvoicesRoutes,
    editinvoicesRoutes,
    invoiceChargesRoutes,
    addinvoiceChargesRoutes,
    editinvoiceChargesRoutes,
    detentionInvoicesRoutes,
    adddetentionInvoicesRoutes,
    editdetentionInvoicesRoutes,
    detentionTraffiesRoutes,
    adddetentionTraffiesRoutes,
    editdetentionTraffiesRoutes,
    detentionTraffSubsRoutes,
    adddetentionTraffSubsRoutes,
    editdetentionTraffSubsRoutes,
    detentionInvoiceContainersRoutes,
    adddetentionInvoiceContainersRoutes,
    editdetentionInvoiceContainersRoutes,
    detentionInvoiceSlabsRoutes,
    adddetentionInvoiceSlabsRoutes,
    editdetentionInvoiceSlabsRoutes,
    //arrival Notice
    arrivalNoticiesRoutes,
    addarrivalNoticiesRoutes,
    editarrivalNoticiesRoutes,
    arrivalNoticeChargesRoutes,
    addarrivalNoticeChargesRoutes,
    editarrivalNoticeChargesRoutes,
    arrivalNoticeContainersRoutes,
    addarrivalNoticeContainersRoutes,
    editarrivalNoticeContainersRoutes,

    editeuipment,
    clientsRoutes,
    addclientsRoutes,
    editclientsRoutes,
    countriesRoutes,
    //rolesRoutes,
    currenciesRoutes,
    accesspointsRoutes,
    defaultvaluesRoutes,
    equipmentsaledetailsRoutes,
    swapsRoutes,
    swaphistoriesRoutes,
    vendorsRoutes,
    addvendorsRoutes,
    editvendorsRoutes,
    bill_of_landingRoutes,
    add_bill_of_landingRoutes,
    edit_bill_of_landingRoutes,
    bill_of_landing_switchesRoutes,
    add_bill_of_landing_switchesRoutes,
    edit_bill_of_landing_switchesRoutes,
    bill_of_landing_non_inventoriesRoutes,
    add_bill_of_landing_non_inventoriesRoutes,
    edit_bill_of_landing_non_inventoriesRoutes,
    bill_of_landing_subsRoutes,
    add_bill_of_landing_subsRoutes,
    edit_bill_of_landing_subsRoutes,
    bill_of_landing_subs_non_inventoriesRoutes,
    add_bill_of_landing_subs_non_inventoriesRoutes,
    edit_bill_of_landing_subs_non_inventoriesRoutes,
    bill_of_landing_subswitchesRoutes,
    add_bill_of_landing_subswitchesRoutes,
    edit_bill_of_landing_subswitchesRoutes,
];

const authProtectedRoutes = [
    //dashboardRoutes,
    equipmentsRoutes,
    Master,
    ownerRoutes,
    receiptRoutes,
    voucherRoutes,
    detentionRoutes,
    invoiceRoutes,
    bookingConfirmationsRoutes,
    arrivalNoticieRoutes,
    clientmasterRoutes,
    exportRoutes,
    equipmentsaledetailsRoutes,
    //rolesRoutes,
    // ...appRoutes,
    // pagesRoutes,
    // componentsRoutes,
    // chartRoutes,
    // formsRoutes,
    // tableRoutes,
];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
