import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CarouselComponent({ data, containerStyle }) {
	var _carousel = React.createRef();
	const sliderWidth = wp(100),
		itemWidth = wp(100);
	const [activeSlide, setActiveSlide] = useState(1);
	const _renderItem = ({ item, index }) => {
		return (
			<View>
				<Image source={item.image} style={styles.image} />
			</View>
		);
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.carouselContainer}>
				<Carousel
					ref={(c) => (_carousel = c)}
					data={data}
					renderItem={_renderItem}
					sliderWidth={sliderWidth}
					itemWidth={itemWidth}
					firstItem={activeSlide}
					inactiveSlideScale={0.94}
					inactiveSlideOpacity={0.7}
					// inactiveSlideShift={20}
					loop={true}
					loopClonesPerSide={2}
					autoplay={true}
					autoplayDelay={500}
					autoplayInterval={3000}
					onSnapToItem={(index) => setActiveSlide(index)}
				/>
				<Pagination
					dotsLength={data.length}
					activeDotIndex={activeSlide}
					containerStyle={styles.paginationContainer}
					dotColor={'rgba(0, 0, 0, 0.8)'}
					dotStyle={styles.paginationDot}
					inactiveDotColor={'black'}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
					carouselRef={_carousel}
					tappableDots={!!_carousel}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: 10,
	},
	carouselContainer: {
		width: wp(100),
		height: hp(30),
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	title: {
		fontSize: 14,
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	paginationContainer: {
		bottom: '10%',
		paddingVertical: 15,
	},
});
