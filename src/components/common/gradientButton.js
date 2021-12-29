import React from 'react';
import propTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Spinner } from './index';

const GradientButton = ({ onPress, isLoading, label, isDisabled, colors, textColor, style }) => (
    <TouchableOpacity style={{ ...styles.Button, }} onPress={onPress} disabled={isDisabled}>
        <LinearGradient
            style={{ width: '100%', height: '100%', borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 2, opacity: isDisabled ? 0.5 : 1, ...style }} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors}
        >
            {isLoading ? <Spinner color='white' /> : <Text style={{ ...styles.Text, color: textColor }}>{label}</Text>}
        </LinearGradient>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    Button: {
        marginBottom: 10,
    
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
    Text: {
        fontSize: 18,

    }
});
GradientButton.propTypes = {
    onPress: propTypes.func.isRequired,
    disabled: propTypes.bool,
    isLoading: propTypes.bool,
    label: propTypes.string.isRequired,
    colors: propTypes.array.isRequired,
    style: propTypes.object
};
export { GradientButton };
