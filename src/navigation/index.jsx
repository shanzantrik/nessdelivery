import React from 'react';
import { HomepageToolbar } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
} from '../pages';
import { Image } from 'react-native';

const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

function HomeStackNavigation({ navigation }) {
	return (
		<HomeStack.Navigator
			initialRouteName="ProductDetail"
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
				name="SplashScreen"
				component={SplashScreen}
				options={{ headerShown: false }}
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
			<HomeStack.Screen
				name="SubCategories"
				component={SubCategories}
				options={{
					header: (props) => (
						<HomepageToolbar {...props} navigation={navigation} />
					),
				}}
			/>
			<HomeStack.Screen
				name="ProductList"
				component={ProductList}
				options={{
					header: (props) => (
						<HomepageToolbar {...props} navigation={navigation} />
					),
				}}
			/>
			<HomeStack.Screen
				name="Homepage"
				component={HomePage}
				options={{
					header: (props) => (
						<HomepageToolbar {...props} navigation={navigation} />
					),
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
		</HomeStack.Navigator>
	);
}

function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="Home" drawerType="front">
			<Drawer.Screen name="Profile" component={HomeStackNavigation} />
			<Drawer.Screen
				name="Home"
				component={HomeStackNavigation}
				options={{
					drawerIcon: ({ focused, color }) => (
						<Icon name="home" color={color} size={20} />
					),
				}}
			/>
			<Drawer.Screen
				name="Wishlist"
				component={HomeStackNavigation}
				options={{
					drawerIcon: ({ focused, color }) => (
						<Icon name="home" color={color} size={20} />
					),
				}}
			/>
			<Drawer.Screen
				name="My Orders"
				component={HomeStackNavigation}
				options={{
					drawerIcon: ({ focused, color }) => (
						<Icon name="shopping-cart" color={color} size={20} />
					),
				}}
			/>
			<Drawer.Screen
				name="Login"
				component={HomeStackNavigation}
				options={{
					drawerIcon: ({ focused, color }) => (
						<Icon name="home" color={color} size={20} />
					),
				}}
			/>
			<Drawer.Screen
				name="Register"
				component={HomeStackNavigation}
				options={{
					drawerIcon: ({ focused, color }) => (
						<Icon name="home" color={color} size={20} />
					),
				}}
			/>
			<Drawer.Screen
				name="Logout"
				component={HomeStackNavigation}
				options={{
					drawerIcon: ({ focused, color }) => (
						<Icon name="home" color={color} size={20} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<DrawerNavigator />
		</NavigationContainer>
	);
}
