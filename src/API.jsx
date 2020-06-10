import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
	url: 'https://nessfrozenhub.in',
	consumerKey: 'ck_c30100e7b9fd584cfa7adcea71444a018aa5b697',
	consumerSecret: 'cs_faed940b867241d0630d53eafafeac0eb82b6595',
	version: 'wc/v3',
});

export default api;
