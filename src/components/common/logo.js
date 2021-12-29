import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropType from 'prop-types';

const Logo = (props) => (
	<View style={{ ...styles.LogoContainer, height: props.height }} >
		<Image style={styles.Logo} source={props.source} />
	</View>
);
const styles = StyleSheet.create({
	LogoContainer: {
		width: '100%',
		resizeMode: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	Logo: {
		height: 300,
		width: 150,
		resizeMode: 'center',
		borderRadius:300
	}
});
Logo.PropType = {
	height: PropType.string,
	source: PropType.string.isRequired
};
export { Logo };
