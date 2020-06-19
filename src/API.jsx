import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Actions from './redux/Actions';

export function RefreshData(setLoading) {
	const dispatch = useDispatch();
	const subCategories = [];
	setLoading(true);
	API.get('products/categories?per_page=100')
		.then((cats) => {
			Promise.all([
				cats.data
					.filter((cat_item) => cat_item.display === 'default')
					.map((cat_id) => {
						return API.get(
							`products/categories?parent=${cat_id.id}`
						);
					}),
				API.get('products?per_page=100'),
				axios.get(
					'https://nessfrozenhub.in/wp-json/wp/v2/media?categories=1'
				),
				API.get('payment_gateways'),
			])
				.then((values) => {
					values[0].map((sub_cat) => {
						sub_cat.then((subCategoryValues) => {
							subCategories.push(...subCategoryValues.data);
						});
					});
					dispatch({
						type: Actions.CATEGORIES,
						payload: cats.data.sort(compare),
					});
					dispatch({
						type: Actions.SUB_CATEGORIES,
						payload: subCategories.sort(compareReverse),
					});
					dispatch({
						type: Actions.PRODUCTS,
						payload: values[1].data.sort(compare),
					});
					dispatch({
						type: Actions.CAROUSEL,
						payload: values[2].data.sort(compare),
					});
					dispatch({
						type: Actions.PAYMENTS,
						payload: values[3].data.filter(
							(item) => item.id !== 'paypal'
						),
					});

					setLoading(false);
				})
				.catch((error) => console.log(error));
		})
		.catch((error) => console.error(error));
}

const compare = (a, b) => {
	let comparison = 0;
	if (a.id > b.id) {
		comparison = 1;
	} else {
		comparison = -1;
	}

	return comparison; // Multiplying it with -1 reverses the sorting order
};

const compareReverse = (a, b) => {
	let comparison = 0;
	if (a.id > b.id) {
		comparison = 1;
	} else {
		comparison = -1;
	}

	return comparison * -1; // Multiplying it with -1 reverses the sorting order
};

const API = new WooCommerceRestApi({
	url: 'https://nessfrozenhub.in',
	consumerKey: 'ck_c30100e7b9fd584cfa7adcea71444a018aa5b697',
	consumerSecret: 'cs_faed940b867241d0630d53eafafeac0eb82b6595',
	version: 'wc/v3',
});

export default API;
