import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
	url: 'https://nessfrozenhub.in',
	consumerKey: 'ck_e1ede8d97da3048865e2e0e9da37cf2f602e8d86',
	consumerSecret: 'cs_d3bf68b259d0e7de5b682638d352400631a018cb',
	version: 'wc/v3',
});

export default api;
