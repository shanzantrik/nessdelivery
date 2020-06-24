import React, { useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { HomepageToolbar } from '../components';
import {
	NavigationContainer,
	StackActions,
	useNavigation,
} from '@react-navigation/native';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import {
	createDrawerNavigator,
	DrawerItem,
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import TestPage from '../pages/TestPage';

//Shared Element Navigator
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

//HomeStack Screens
import {
	SplashScreen,
	Login,
	Signup,
	OTPScreen,
	HomePage,
	SubCategories,
	ProductList,
	CategoriesModal,
	ProductDetail,
	RelatedProductDetail,
	Cart,
	Payment,
	CardPage,
	SearchList,
	Profile,
	Location,
	AddAddress,
	YourOrders,
	CouponsPage,
} from '../pages';
import { Colors, Fonts } from '../constants';
import Actions from '../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import API from '../API';

const HomeStack = createStackNavigator();
const DrawerNav = createDrawerNavigator();

const SharedStack = createSharedElementStackNavigator();

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};

function ProductSharedNavigator({ navigation }) {
	return (
		<SharedStack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: 'white',
				},
			}}>
			<SharedStack.Screen
				name="ProductList"
				component={ProductList}
				options={{
					header: (props) => <HomepageToolbar {...props} />,
				}}
			/>
			<SharedStack.Screen
				name="ProductDetail"
				component={ProductDetail}
				options={{
					header: (props) => (
						<HomepageToolbar
							{...props}
							navigation={navigation}
							searchBar={false}
						/>
					),
				}}
				sharedElements={(route, otherRoute, showing) => {
					const { item } = route.params;
					return [
						{
							id: `item.${item.id}.photo`,
							animation: 'move',
						},
					];
				}}
			/>
		</SharedStack.Navigator>
	);
}

function LogoutComponent({ navigation }) {
	useEffect(() => {
		navigation.dispatch(StackActions.popToTop());
	});

	return null;
}

const AuthStack = createStackNavigator();

function AuthStackNavigator({ navigation }) {
	return (
		<AuthStack.Navigator
			initialRouteName="Login"
			screenOptions={{
				cardStyle: {
					backgroundColor: 'white',
				},
				transitionSpec: {
					open: config,
					close: config,
				},
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}>
			<HomeStack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<HomeStack.Screen name="Signup" component={Signup} />
			<HomeStack.Screen
				name="OTPScreen"
				component={OTPScreen}
				options={{ headerShown: false }}
			/>
		</AuthStack.Navigator>
	);
}

const ProfileStack = createStackNavigator();

function ProfileStackNavigator({ navigation }) {
	return (
		<ProfileStack.Navigator
			initialRouteName="Profile"
			screenOptions={{
				cardStyle: {
					backgroundColor: 'white',
				},
				transitionSpec: {
					open: config,
					close: config,
				},
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}>
			<ProfileStack.Screen name="Profile" component={Profile} />
			<ProfileStack.Screen
				name="AddAddress"
				component={AddAddress}
				options={{
					headerTitle: 'Add Address',
				}}
			/>
		</ProfileStack.Navigator>
	);
}

const OrdersStack = createStackNavigator();

function OrdersStackNavigator({ navigation }) {
	return (
		<OrdersStack.Navigator
			initialRouteName="Profile"
			screenOptions={{
				cardStyle: {
					backgroundColor: 'white',
				},
				transitionSpec: {
					open: config,
					close: config,
				},
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}>
			<OrdersStack.Screen
				name="YourOrders"
				component={YourOrders}
				options={{
					headerTitle: 'My Orders',
				}}
			/>
		</OrdersStack.Navigator>
	);
}

function HomeStackNavigation({ navigation }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.login);
	return (
		<HomeStack.Navigator
			initialRouteName={
				user !== null && user.token !== '' ? 'SplashScreen' : 'Location'
			}
			screenOptions={{
				cardStyle: {
					backgroundColor: 'white',
				},
				transitionSpec: {
					open: config,
					close: config,
				},
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}>
			{user === null || user.token === null ? (
				<>
					<HomeStack.Screen
						name="Location"
						component={Location}
						options={{
							headerShown: false,
						}}
					/>
					<HomeStack.Screen
						name="Login"
						component={Login}
						options={{ headerShown: false }}
					/>
					<HomeStack.Screen name="Signup" component={Signup} />
					<HomeStack.Screen
						name="OTPScreen"
						component={OTPScreen}
						options={{ headerShown: false }}
					/>
				</>
			) : (
				<>
					<HomeStack.Screen
						name="SplashScreen"
						component={SplashScreen}
						options={{
							headerShown: false,
							backgroundColor: '#161616',
						}}
					/>
					<HomeStack.Screen
						name="SubCategories"
						component={SubCategories}
						options={{
							header: (props) => <HomepageToolbar {...props} />,
						}}
					/>
					<HomeStack.Screen
						name="Login"
						component={Login}
						options={{ headerShown: false }}
					/>
					<HomeStack.Screen
						name="Homepage"
						component={HomePage}
						options={{
							header: (props) => <HomepageToolbar {...props} />,
						}}
					/>
					<HomeStack.Screen
						name="CategoriesModal"
						component={CategoriesModal}
						options={{
							headerShown: false,
							cardStyleInterpolator:
								CardStyleInterpolators.forModalPresentationIOS,
						}}
					/>
					<HomeStack.Screen
						name="ProductList"
						component={ProductList}
						options={{
							header: (props) => <HomepageToolbar {...props} />,
						}}
					/>
					<HomeStack.Screen
						name="ProductDetail"
						component={ProductDetail}
						options={{
							header: (props) => (
								<HomepageToolbar
									{...props}
									navigation={navigation}
									searchBar={false}
								/>
							),
						}}
					/>
					<HomeStack.Screen
						name="RelatedProductDetail"
						component={RelatedProductDetail}
						options={{
							header: (props) => (
								<HomepageToolbar
									{...props}
									navigation={navigation}
									searchBar={false}
								/>
							),
						}}
					/>
					<HomeStack.Screen
						name="Cart"
						component={Cart}
						options={{
							headerTitle: 'Your Cart',
							headerRight: () => {
								return (
									<TouchableOpacity
										onPress={() => {
											dispatch({
												type: Actions.CLEAR_CART,
											});
										}}>
										<View style={{ marginEnd: 20 }}>
											<Text
												style={{
													fontSize: 16,
													fontFamily: Fonts.bold,
												}}>
												Clear Cart
											</Text>
										</View>
									</TouchableOpacity>
								);
							},
						}}
					/>
					<HomeStack.Screen
						name="Payment"
						component={Payment}
						options={{
							headerTitle: 'Payment',
							cardStyle: {
								backgroundColor: '#eff0f4',
							},
						}}
					/>
					<HomeStack.Screen
						name="CardPage"
						component={CardPage}
						options={{
							headerTitle: 'Add Card',
							cardStyle: {
								backgroundColor: '#eff0f4',
							},
						}}
					/>
					<HomeStack.Screen
						name="SearchList"
						component={SearchList}
						options={{
							header: (props) => (
								<HomepageToolbar
									{...props}
									navigation={navigation}
									searchBar={false}
								/>
							),
						}}
					/>
					<HomeStack.Screen name="Profile" component={Profile} />
					<HomeStack.Screen
						name="AddAddress"
						component={AddAddress}
						options={{
							headerTitle: 'Add Address',
						}}
					/>
					<HomeStack.Screen
						name="CouponsPage"
						component={CouponsPage}
						options={{
							headerShown: false,
							cardStyleInterpolator:
								CardStyleInterpolators.forModalPresentationIOS,
						}}
					/>
					<HomeStack.Screen name="Coupons" component={CouponsPage} />
					<HomeStack.Screen
						name="YourOrders"
						component={YourOrders}
						options={{
							headerTitle: 'My Orders',
						}}
					/>
					<HomeStack.Screen name="TestPage" component={TestPage} />
				</>
			)}
		</HomeStack.Navigator>
	);
}

function DrawerNavigator() {
	return (
		<DrawerNav.Navigator
			drawerType="front"
			drawerContent={(props) => <CustomDrawerNavigator {...props} />}>
			<DrawerNav.Screen name="Home" component={HomeStackNavigation} />
		</DrawerNav.Navigator>
	);
}

function CustomDrawerNavigator(props) {
	const { navigation } = props;
	const [drawerItemIndex, setDrawerItemIndex] = React.useState(1);
	return (
		<DrawerContentScrollView {...props}>
			<Drawer.Section>
				<DrawerItem
					key={1}
					icon={({ color, size }) => (
						<View
							style={{
								width: 30,
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Icon
								name="home"
								style={{
									margin: 5,
									fontSize: 16,
									fontFamily: Fonts.semiBold,
									textAlign: 'center',
									color: Colors.black,
								}}
								color={color}
								size={size}
							/>
						</View>
					)}
					label="Home"
					labelStyle={{
						fontSize: 15,
						fontFamily: Fonts.primary,
					}}
					active={drawerItemIndex === 1}
					onPress={() => {
						setDrawerItemIndex(1);
						navigation.closeDrawer();
						navigation.navigate('Homepage');
					}}
				/>
				<DrawerItem
					key={2}
					icon={({ color, size }) => (
						<View
							style={{
								width: 30,
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Icon
								name="user"
								style={{
									margin: 5,
									fontSize: 16,
									fontFamily: Fonts.semiBold,
									textAlign: 'center',
									color: Colors.black,
								}}
								color={color}
								size={size}
							/>
						</View>
					)}
					label="Profile"
					labelStyle={{
						fontSize: 15,
						fontFamily: Fonts.primary,
					}}
					active={drawerItemIndex === 2}
					onPress={() => {
						setDrawerItemIndex(2);
						navigation.closeDrawer();
						navigation.navigate('Profile');
					}}
				/>
				<DrawerItem
					key={3}
					icon={({ color, size }) => (
						<View
							style={{
								width: 30,
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<Icon
								name="shopping-cart"
								style={{
									margin: 5,
									fontSize: 16,
									fontFamily: Fonts.semiBold,
									textAlign: 'center',
									color: Colors.black,
								}}
								color={color}
								size={size}
							/>
						</View>
					)}
					label="My Orders"
					labelStyle={{
						fontSize: 15,
						fontFamily: Fonts.primary,
					}}
					active={drawerItemIndex === 3}
					onPress={() => {
						setDrawerItemIndex(3);
						navigation.closeDrawer();
						navigation.navigate('YourOrders');
					}}
				/>
				<DrawerItem
					key={4}
					icon={({ color, size }) => (
						<View
							style={{
								width: 30,
								height: 30,
								alignItems: 'center',
								justifyContent: 'center',
								borderColor: Colors.black,
								borderWidth: 1,
								borderRadius: 15,
							}}>
							<Icon
								name="percent"
								style={{
									margin: 5,
									fontSize: 12,
									fontFamily: Fonts.semiBold,
									textAlign: 'center',
									color: Colors.black,
								}}
								color={color}
								size={size}
							/>
						</View>
					)}
					label="Coupons"
					labelStyle={{
						fontSize: 15,
						fontFamily: Fonts.primary,
					}}
					active={drawerItemIndex === 4}
					onPress={() => {
						setDrawerItemIndex(4);
						navigation.closeDrawer();
						navigation.navigate('Coupons');
					}}
				/>
			</Drawer.Section>
		</DrawerContentScrollView>
	);
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<DrawerNavigator />
		</NavigationContainer>
	);
}
