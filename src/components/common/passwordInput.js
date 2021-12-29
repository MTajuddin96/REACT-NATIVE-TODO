import React from 'react';
import { TextInput } from 'react-native';
import { purple, placeholderColor } from '../common/index';
import { Fonts } from '../../utils/fonts';

const PasswordInput = (props) => {
    return (
      <TextInput
        allowFontScaling={false}
        style={{ fontFamily: Fonts.OpenSans, zIndex: 100, fontSize: 30, letterSpacing: 30, padding: 0, width: 238, borderBottomWidth: 2, color: purple, marginBottom: -5, borderColor: placeholderColor }}
        onChangeText={props.onChange}
        value={props.textValue}
        keyboardType='numeric'
        maxLength={5}
      />
    );
  };
export { PasswordInput };
