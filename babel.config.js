module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'react-native-stylename-to-style',
			{
				extensions: ['css', 'scss', 'sass'],
			},
		],
		[
			'react-native-platform-specific-extensions',
			{
				extensions: ['css', 'scss', 'sass'],
			},
		],
	],
};
