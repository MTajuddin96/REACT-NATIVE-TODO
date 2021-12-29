import React, { Component, useState } from 'react';
import propTypes from 'prop-types';
import { TextInput, StyleSheet, Animated, View, Text, Image } from 'react-native';
import { lightGrey, darkGrey, tooltipColor, placeholderColor, green } from '../../styles/colors';


const Input = (props) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
  const [borderColor, setBorderColor] = useState(props.initialColor);
  const [visible, setVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [animatedStyle, setAnimatedStyle] = useState({});
  const [animatedStyle2, setAnimatedStyle2] = useState({
    borderColor: tooltipColor,
    backgroundColor: '#ede6e6'
  });

  function onFocus() {
    setAnimatedValue(new Animated.Value(0));
    const interpolatedColor = animatedValue.interpolate({
      inputRange: [0, 60],
      outputRange: [props.initialColor, props.finalColor]
    });
    setAnimatedStyle({
      borderColor: interpolatedColor,
      borderWidth: 2,
    })
    setTooltipVisible(true)
    setIsActive(true)
    Animated.timing(animatedValue, {
      toValue: 30,
      duration: 400,
      useNativeDriver: false
    }).start();
  }

  function onBlur() {
    Animated.timing(animatedValue).stop();
    setAnimatedStyle({
      borderColor: props.initialColor,
      borderWidth: 2,
    })
    setTooltipVisible(false)
    setIsActive(false)
  }


  const {
    multiline,
    numberOfLines,
    style,
    isAnimated, // Prop for activating border animation on input field
    keyboardType, // Prop for definig keyboard type (eg:'email-address')
    placeholder, // Prop for setting the text of place holder,
    isSecure, // Prop for password type input
    onChange, // prop for handling the user input
    value, // prop for text on the input field
    hasImage, // prop for setting image
    imageSourceInit, // prop for initial image source
    imageSourceFinal // prop for final image source
  } = props;


  return (
    isAnimated ?
      <Animated.View style={props.isValid ? { ...styles.TextInput, ...animatedStyle, backgroundColor: lightGrey, ...props.style } : { ...styles.TextInput, ...animatedStyle2, ...props.style }}>
        <View style={{ flexDirection: 'row', }}>
          {(!props.isValid && tooltipVisible) ? <View style={{ paddingLeft: 15, backgroundColor: tooltipColor, position: 'absolute', width: '100%', zIndex: 100000, top: -45, height: 35, borderRadius: 20, elevation: 2, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'left', color: 'white', }}>{props.toolTipText}</Text>
            <View style={{ height: 0, width: 0, position: 'absolute', bottom: -8, left: 20, borderLeftWidth: 10, borderLeftColor: 'transparent', borderRightWidth: 10, borderRightColor: 'transparent', borderTopWidth: 10, borderTopColor: tooltipColor }} />
          </View> : null}
          {(hasImage) ? <View style={isActive ? { justifyContent: 'center', alignItems: 'center', height: 41, width: 55, paddingRight: 10, borderBottomLeftRadius: 30, borderTopLeftRadius: 30, marginRight: 10, borderRightWidth: 1, borderRightColor: green } : { justifyContent: 'center', alignItems: 'center', height: 41, width: 55, paddingRight: 10, borderBottomLeftRadius: 30, borderTopLeftRadius: 30, marginRight: 10, borderRightWidth: 1, borderRightColor: '#d6d6d6' }} >
            <Image style={{ marginLeft: 15, height: 20, width: 20 }} source={imageSourceInit} />
          </View> : null}
          <TextInput
            placeholderTextColor={placeholderColor}
            keyboardType={keyboardType}
            value={value}
            style={{ width: '80%' }}
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={isSecure}
            onFocus={() => onFocus()}
            onBlur={() => onBlur()}
            selectionColor={green}
            multiline={multiline || false}
            numberOfLines={numberOfLines}
          />
        </View>
      </Animated.View>
      :
      <TextInput
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        value={value}
        style={{ ...style }}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={isSecure}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        selectionColor={green}
        multiline={multiline || false}
        numberOfLines={numberOfLines}
      />
  );

}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: 'transparent',
    width: '85%',
    height: 45,
    paddingRight: 10,
    borderRadius: 30,
    marginBottom: 12,
    justifyContent: 'center',
    color: darkGrey,
    fontSize: 16,
    borderWidth: 2,
    borderColor: lightGrey,
  },
});

Input.propTypes = {
  initialColor: propTypes.string,
  finalColor: propTypes.string,
  isAnimated: propTypes.bool,
  keyboardType: propTypes.string,
  placeholder: propTypes.string.isRequired,
  isSecure: propTypes.bool,
  onChange: propTypes.func.isRequired,
  value: propTypes.string,
  toolTipText: propTypes.string.isRequired,
  hasImage: propTypes.bool,
  imageSourceInit: propTypes.number,
  imageSourceFinal: propTypes.number,
  style: propTypes.object,
  multiline: propTypes.bool,
  numberOfLines: propTypes.number,
  isValid: propTypes.bool
};
export { Input };
