import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image, Dimensions, Animated } from 'react-native';
import { purple } from '../../styles/colors';
import { styles } from '../../Screens/Login/LoginScreen.style';


const NotificationModal = (props) => {
  return (
    <Animated.View
      style={{
        opacity: props.modalAnimation,
        zIndex: props.modalAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 100]
        }),
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
  }}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100 }}>
        <View style={{ resizeMode: 'center', height: Dimensions.get('screen').height / 2.5, backgroundColor: purple, justifyContent: 'space-around', alignItems: 'center', elevation: 3, zIndex: 100 }}>
          <Image style={{ height: 70, width: 90 }} source={require('../../assets/images/alert.png')} />
          <Text style={{ ...styles.Text, color: 'white' }}>{props.ErrorText}</Text>
          <TouchableOpacity onPress={props.modalClicked}>
            <View
              style={{
                width: 80,
                height: 40,
                alignItems: 'center',
                zIndex: 1000,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 30,
                elevation: 3
          }}>
              <Text style={{ ...styles.Text, color: purple }}>OK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};
NotificationModal.propTypes = {
  modalAnimation: PropTypes.object,
  ErrorText: PropTypes.string.isRequired,
  modalClicked: PropTypes.func.isRequired,
};

export { NotificationModal };
