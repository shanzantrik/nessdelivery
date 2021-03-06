import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Fonts, Colors } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import API from '../API';

const RatingData = [
	{
		rating: 1,
		title: 'Fries not fresh',
		body:
			'I very much like eating french fries, but after using this product, I simply cannot eat fries anymore. Not so good',
		name: 'Sunny',
		location: 'Delhi',
		time: '1 week ago',
		likes: 10,
	},
	{
		rating: 5,
		title: 'Fries very good',
		body: 'These fries are awesome, easy to cook and very tasty.',
		name: 'Akshay',
		location: 'Pune',
		time: '2 months ago',
		likes: 16,
	},
];

export default function RatingsAndReviews({ itemId }) {
	const [reviews, setReviews] = useState(null);
	useEffect(() => {
		API.get('products/reviews?product=' + itemId)
			.then((res) => setReviews(res.data))
			.catch((error) => console.error(error));
	});

	const RenderReviews = ({ index, item }) => {
		return (
			<View style={{ marginVertical: 10 }}>
				<View style={{ flexDirection: 'row' }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							backgroundColor:
								item.rating >= 3
									? Colors.greenSecondary
									: Colors.redSecondary,
							paddingHorizontal: 8,
							borderRadius: 4,
						}}>
						<Text
							style={{
								fontSize: 10,
								marginEnd: 4,
								color:
									item.rating >= 5
										? Colors.greenText
										: Colors.redPrimary,
								textAlign: 'center',
							}}>
							{item.rating}
						</Text>
						<Icon
							name="star"
							style={{
								fontSize: 10,
								color:
									item.rating >= 3
										? Colors.greenText
										: Colors.redPrimary,
								textAlign: 'center',
							}}
							solid
						/>
					</View>
					<View style={{ marginStart: 10, alignItems: 'center' }}>
						<Text
							style={{
								fontSize: 16,
								fontFamily: Fonts.primary,
								textAlign: 'center',
							}}>
							{item.title}
						</Text>
					</View>
				</View>
				<View style={{ marginVertical: 10 }}>
					<Text>{item.body}</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<View style={{ flexDirection: 'row' }}>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.primary,
								marginEnd: 5,
								color: '#505050',
							}}>
							{item.name},
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.primary,
								marginEnd: 5,
								color: '#505050',
							}}>
							{item.location}
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.primary,
								marginEnd: 5,
								color: '#505050',
							}}>
							({item.time})
						</Text>
					</View>
				</View>
			</View>
		);
	};
	return (
		<View style={{ margin: 20 }}>
			<View
				style={{
					paddingBottom: 20,
				}}>
				<Text style={{ fontSize: 16, fontFamily: Fonts.semiBold }}>
					Ratings & Reviews
				</Text>
				<View
					style={{
						borderColor: '#999999',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderTopWidth: 1,
						borderBottomWidth: 1,
						paddingVertical: 10,
						marginTop: 10,
					}}>
					<View>
						<View
							style={{
								flexDirection: 'row',
							}}>
							<Text
								style={{
									fontSize: 25,
									fontFamily: Fonts.semiBold,
									color: Colors.greenText,
									marginEnd: 5,
								}}>
								{data.average_rating}
							</Text>
							<Icon
								name="star"
								style={{
									fontSize: 12,
									fontFamily: Fonts.primary,
									color: Colors.greenText,
									alignSelf: 'flex-end',
									paddingBottom: 5,
								}}
								solid
							/>
						</View>
						<View>
							<Text
								style={{
									fontSize: 12,
									fontFamily: Fonts.primary,
								}}>
								{data.rating_count} Ratings
							</Text>
						</View>
					</View>
					<TouchableOpacity>
						<View>
							<Icon
								name="chevron-right"
								style={{
									fontSize: 20,
									fontFamily: Fonts.semiBold,
									textAlign: 'center',
									marginEnd: 10,
								}}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			{/* <View>
				<View>
					<Text style={{ fontSize: 16, fontFamily: Fonts.semiBold }}>
						Highlights
					</Text>
				</View>
				<View
					style={{
						marginVertical: 20,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<View style={{ alignItems: 'center' }}>
						<Progress.Circle
							animated
							size={80}
							thickness={6}
							borderColor={'#00000000'}
							progress={0.86}
							color={Colors.greenText}
							unfilledColor={'#689f3933'}
							strokeCap={'round'}
							showsText={true}
							formatText={(progress) => progress / 0.2}
							textStyle={{
								fontSize: 20,
								color: Colors.black,
							}}
						/>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.primary,
								marginVertical: 5,
							}}>
							Softness
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.primary,
								color: '#505050',
							}}>
							413 ratings
						</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Progress.Circle
							animated
							size={80}
							thickness={6}
							borderColor={'#00000000'}
							progress={0.86}
							color={Colors.greenText}
							unfilledColor={'#689f3933'}
							strokeCap={'round'}
							showsText={true}
							formatText={(progress) => progress / 0.2}
							textStyle={{
								fontSize: 20,
								color: Colors.black,
							}}
						/>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.primary,
								marginVertical: 5,
							}}>
							Puffiness
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.primary,
								color: '#505050',
							}}>
							369 ratings
						</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<Progress.Circle
							animated
							size={80}
							thickness={6}
							borderColor={'#00000000'}
							progress={0.82}
							color={Colors.greenText}
							unfilledColor={'#689f3933'}
							strokeCap={'round'}
							showsText={true}
							formatText={(progress) => progress / 0.2}
							textStyle={{
								fontSize: 20,
								color: Colors.black,
							}}
						/>
						<Text
							style={{
								fontSize: 14,
								fontFamily: Fonts.primary,
								marginVertical: 5,
							}}>
							Taste
						</Text>
						<Text
							style={{
								fontSize: 12,
								fontFamily: Fonts.primary,
								color: '#505050',
							}}>
							361 ratings
						</Text>
					</View>
				</View>
			</View> */}
			<FlatList
				data={reviews}
				renderItem={(object) => <RenderReviews {...object} />}
				keyExtractor={(index, item) => index.toString()}
				ItemSeparatorComponent={() => (
					<View style={{ height: 1, backgroundColor: '#999999' }} />
				)}
			/>
		</View>
	);
}
