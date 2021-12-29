import { StyleSheet, Dimensions } from 'react-native';
import { inputTextColor } from '../../styles/colors';
import { Fonts } from '../../utils/fonts';

const styles = StyleSheet.create({
  Text: {
    fontFamily: Fonts.OpenSans,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: inputTextColor
  },
  BottomText: {
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  loginFormContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('screen').height / 2.4
  }
});

export { styles };
