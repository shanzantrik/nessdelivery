import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Fonts } from '../constants';

export default function AboutProduct({ data }) {
	const RenderItem = ({ index, item }) => {
		const [viewMore, setViewMore] = React.useState(false);
		return (
			<View
				style={{
					paddingVertical: 15,
					marginBottom: viewMore ? 10 : 0,
				}}>
				<View
					style={{
						paddingVertical: 5,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Text
						style={{
							fontSize: 16,
							fontFamily: Fonts.semiBold,
							color: '#505050',
						}}>
						{item.title}
					</Text>
					<TouchableOpacity onPress={() => setViewMore(!viewMore)}>
						<Text style={{ fontSize: 20, color: '#505050' }}>
							{!viewMore ? '+' : '−'}
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ paddingHorizontal: 20 }}>
					<Text
						style={{
							fontSize: 14,
							fontFamily: Fonts.primary,
							color: '#505050',
						}}
						numberOfLines={!viewMore ? 2 : 10}>
						{item.details}
					</Text>
					<TouchableOpacity
						style={{
							position: 'absolute',
							right: 0,
							bottom: viewMore ? -10 : 0,
						}}
						onPress={() => setViewMore(!viewMore)}>
						<View
							style={{
								flexDirection: 'row',
								backgroundColor: '#ffffff',
								paddingStart: 5,
								borderTopLeftRadius: 5,
								borderBottomLeftRadius: 5,
							}}>
							<Text
								style={{
									textAlign: 'center',
									color: '#4084f3',
									fontFamily: Fonts.semiBold,
								}}>
								{!viewMore ? 'View More' : null}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	};
	return (
		<View style={{ margin: 20 }}>
			<View
				style={{
					borderBottomColor: '#999999',
					borderBottomWidth: 1,
					paddingBottom: 20,
				}}>
				<Text style={{ fontSize: 18, fontFamily: Fonts.semiBold }}>
					About this Product
				</Text>
			</View>
			<FlatList
				data={data}
				contentContainerStyle={{
					borderBottomColor: '#999999',
					borderBottomWidth: 1,
				}}
				keyExtractor={(index, item) => index.toString()}
				renderItem={(object) => <RenderItem {...object} />}
				ItemSeparatorComponent={() => (
					<View
						style={{
							width: '100%',
							height: 1,
							backgroundColor: 'gray',
						}}
					/>
				)}
			/>
		</View>
	);
}
