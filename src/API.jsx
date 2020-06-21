import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Actions from './redux/Actions';
import { useNavigation } from '@react-navigation/native';

export const RefreshData = (navigate) => {
	const dispatch = useDispatch();
	API.get('products/categories?per_page=100')
		.then((cats) => {
			const simpleCats = cats.data.filter(
				(cat_item) => cat_item.display === 'default'
			);
			Promise.all([
				simpleCats.map((cat_id) => {
					return API.get(`products/categories?parent=${cat_id.id}`);
				}),
				API.get('products?per_page=100'),
				axios.get(
					'https://nessfrozenhub.in/wp-json/wp/v2/media?categories=1'
				),
				API.get('payment_gateways'),
				API.get('products', {
					category: simpleCats.find(
						(sim_cat) => sim_cat.slug === 'chicken'
					).id,
					per_page: 100,
					featured: true,
				}),
				API.get('products', {
					category: simpleCats.find(
						(sim_cat) => sim_cat.slug === 'veg'
					).id,
					per_page: 100,
					featured: true,
				}),
			])
				.then((values) => {
					dispatch({
						type: Actions.CATEGORIES,
						payload: cats.data.sort(compare),
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
					GetSubCategoriesData(values[0], navigate);
				})
				.catch((error) => console.log(error));
		})
		.catch((error) => console.error(error));
};

const GetSubCategoriesData = async (categories, navigate) => {
	const dispatch = useDispatch();
	const subCategories = [];
	await categories.map((sub_cat) => {
		sub_cat.then((subCategoryValues) => {
			subCategories.push(...subCategoryValues.data);
		});
	});
	dispatch({
		type: Actions.SUB_CATEGORIES,
		payload: subCategories.sort(compareReverse),
	});
	const subCatData = await Promise.all(
		subCategories.map(async (item) => {
			return API.get('products', {
				category: item.id,
				per_page: 100,
			});
		})
	);
	const SubCatJSON = subCatData.map((sub) => {
		const subItem = {};
		subItem.id = sub.config.params.category;
		subItem.data = sub.data;
		return {
			...subItem,
		};
	});

	dispatch({
		type: Actions.SUB_CATEGORIES_DATA,
		payload: SubCatJSON.sort(compareReverse),
	});

	const navigation = useNavigation();

	if (navigate) {
		navigation.navigate(navigate);
	}
};

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
