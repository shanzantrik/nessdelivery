import React from 'react';
import { HomepageToolbar } from '../components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//HomeStack Screens
import { HomePage } from '../pages';

const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackNavigation({ navigation }) {
	return (
		<HomeStack.Navigator
			screenOptions={{
				cardStyle: {
					backgroundColor: 'white',
				},
			}}>
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
