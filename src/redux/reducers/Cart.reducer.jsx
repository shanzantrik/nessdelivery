import Actions from '../Actions';
const initialState = {
	addedItems: [],
	total: 0,
};

const Cart = (state = initialState, action) => {
	//INSIDE HOME COMPONENT
	console.log(action);
	console.log(state);
	if (action.type === Actions.ADD_TO_CART) {
		let addedItem = action.payload;
		//check if the action id exists in the addedItems
		let existed_item = state.addedItems.find(
			(item) => action.payload.id === item.id
		);
		console.log('Existed Item: ' + existed_item);
		if (existed_item) {
			addedItem.quantity += 1;
			console.log(addedItem.quantity);
			return {
				...state,
				total:
					parseInt(state.total, 10) + parseInt(addedItem.price, 10),
			};
		} else {
			addedItem.quantity = 1;
			//calculating the total
			let newTotal =
				parseInt(state.total, 10) + parseInt(addedItem.price, 10);

			return {
				...state,
				addedItems: [...state.addedItems, addedItem],
				total: parseInt(newTotal, 10),
			};
		}
	}
	if (action.type === Actions.REMOVE_FROM_CART) {
		let itemToRemove = state.addedItems.find(
			(item) => item.id === action.payload.id
		);
		console.log('Removing form Cart');
		console.log(itemToRemove);
		let new_items = state.addedItems.filter(
			(item) => action.payload.id !== item.id
		);

		//calculating the total
		let newTotal =
			parseInt(state.total, 10) -
			parseInt(itemToRemove.price, 10) *
				parseInt(itemToRemove.quantity, 10);
		console.log(itemToRemove);
		return {
			...state,
			addedItems: new_items,
			total: parseInt(newTotal, 10),
		};
	}
	//INSIDE CART COMPONENT
	if (action.type === Actions.ADD_QUANTITY) {
		let addedItem = state.addedItems.find(
			(item) => item.id === action.payload.id
		);
		addedItem.quantity += 1;
		let newTotal =
			parseInt(state.total, 10) + parseInt(addedItem.price, 10);
		return {
			...state,
			total: parseInt(newTotal, 10),
		};
	}
	if (action.type === Actions.SUB_QUANTITY) {
		let addedItem = state.addedItems.find(
			(item) => item.id === action.payload.id
		);
		//if the qt == 0 then it should be removed
		if (addedItem.quantity === 1) {
			let new_items = state.addedItems.filter(
				(item) => item.id !== action.payload.id
			);
			let newTotal =
				parseInt(state.total, 10) - parseInt(addedItem.price, 10);
			return {
				...state,
				addedItems: new_items,
				total: parseInt(newTotal, 10),
			};
		} else {
			addedItem.quantity -= 1;
			let newTotal =
				parseInt(state.total, 10) - parseInt(addedItem.price, 10);
			return {
				...state,
				total: parseInt(newTotal, 10),
			};
		}
	}

	if (action.type === Actions.CLEAR_CART) {
		return initialState;
	}
	return state;
};

export default Cart;
