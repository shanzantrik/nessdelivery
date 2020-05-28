import React from 'react';
import { HomepageToolbar } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//HomeStack Screens
import { SplashScreen, Login, Signup, HomePage } from '../pages';

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
			initialRouteName="SplashScreen"
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
				name="Homepage"
				component={HomePage}
				options={{
					header: (props) => (
						<HomepageToolbar {...props} navigation={navigation} />
					),
				}}
			/>
		</HomeStack.Navigator>
	);
}

function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={HomeStackNavigation} />
			<Drawer.Screen name="Shop" component={HomeStackNavigation} />
			<Drawer.Screen name="About" component={HomeStackNavigation} />
			<Drawer.Screen name="Veg Items" component={HomeStackNavigation} />
			<Drawer.Screen name="Sea Food" component={HomeStackNavigation} />
			<Drawer.Screen
				name="Chicken Items"
				component={HomeStackNavigation}
			/>
			<Drawer.Screen name="Pork Items" component={HomeStackNavigation} />
			<Drawer.Screen
				name="Mithun Items"
				component={HomeStackNavigation}
			/>
			<Drawer.Screen
				name="Paneer Items"
				component={HomeStackNavigation}
			/>
			<Drawer.Screen
				name="Cheese & Chream"
				component={HomeStackNavigation}
			/>
			<Drawer.Screen name="Ice Cream" component={HomeStackNavigation} />
			<Drawer.Screen name="My Orders" component={HomeStackNavigation} />
			<Drawer.Screen name="Logout" component={HomeStackNavigation} />
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
