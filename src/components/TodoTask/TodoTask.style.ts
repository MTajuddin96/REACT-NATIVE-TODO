import { StyleSheet, Dimensions } from 'react-native';
import { inputTextColor } from '../../styles/colors';
import { Fonts } from '../../utils/fonts';

const styles = StyleSheet.create({
  TodoTask: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    minHeight: 80,
    height: '100%',
    maxHeight: 95,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    cursor: 'pointer',
    color: '#666',
  },
  todoDescription: {
    maxWidth: '80%',
    fontSize: 16,
    overflow: 'hidden',
    color: '#3a9778',
    fontWeight: 'bold',
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
