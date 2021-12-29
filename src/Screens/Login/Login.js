import React, { useEffect, useState } from 'react'
import { Input, GradientButton, Logo, lightGrey, pink, green } from '../../components/common';
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Animated, BackHandler, ToastAndroid } from 'react-native';
import { styles } from './LoginScreen.style';
import { Validate } from '../../utils/validator';
import { NotificationModal } from '../../components/common/NotificationModal';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/auth.services';


const LoginForm = ({ onChange, email, password, onLogin, isLoading, isDisabled, emailState, passwordState, onPress }) => {
  return (
    <View style={{ ...styles.loginFormContainer, justifyContent: 'center' }}>
      <Input
        placeholder='Email'
        isValid={emailState.valid}
        toolTipText={'Enter a valid e-mail'}
        key={'email'}
        keyboardType={'email-address'}
        value={email}
        onChange={(value) => onChange({ value }, 'email', emailState)}
        isAnimated initialColor={lightGrey}
        finalColor={green}
        hasImage
        imageSourceInit={require('../../assets/images/email.png')}
        imageSourceFinal={require('../../assets/images/activeEmail.png')}
      />
      <Input
        placeholder='Password'
        isValid={passwordState.valid}
        toolTipText={'enter your password'}
        key={'password'}
        value={password}
        isSecure
        onChange={(value) => onChange({ value }, 'password', passwordState)}
        isAnimated
        initialColor={lightGrey}
        finalColor={green}
        hasImage
        imageSourceInit={require('../../assets/images/lock.png')}
        imageSourceFinal={require('../../assets/images/activeLock.png')}
      />
      <GradientButton isDisabled={isDisabled} label={'Log In'} onPress={onLogin} isLoading={isLoading} textColor='white' colors={[green, green]} style={{ width: 300 }} />
      <TouchableOpacity onPress={onPress} >
        <Text style={{ ...styles.Text, textDecorationLine: 'underline' }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  )
}



export default function LoginScreen({ navigation }) {

  const [form, setFormValue] = useState({
    email: {
      value: '',
      valid: true,
      validationRules: {
        isEmail: true
      }
    },
    password: {
      value: '',
      valid: true,
      validationRules: {
      }
    },
  })

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [loginDisabled, setLoginDisabled] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalAnimation, setModalAnimation] = useState(new Animated.Value(0))
  // state = {


  //   backClicked: 0,
  //   loginDisabled: true,
  //   isLoading: false,
  //   modalVisible: false,
  //   modalAnimation: new Animated.Value(0)
  // }

  const onChangeHandler = (value, key, currentState) => {
    setLoginDisabled(true);
    setFormValue({ ...form, [key]: { ...currentState, ...value, valid: Validate(value.value, currentState.validationRules) } });
  }
  const loginHandler = () => {
    if (form.email.value && form.password.value && form.password.valid && form.email.valid) {
      try {
        dispatch(loginUser({ email: form.email.value, password: form.password.value }, () => navigation.replace('todo')))
      } catch (error) {
        console.log(error)
      }
    }
    // navigation.replace('todo')
    // this.setModalVisible();
  }
  useEffect(() => {
    if (form.email.value !== '' && form.password.value !== '') {
      setLoginDisabled(false);
    }
  }, [form])

  return (

    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <NotificationModal
        modalVisible={modalVisible}
        modalAnimation={modalAnimation}
        modalClicked={() => setModalVisible(false)}
        ErrorText='Please enter a valid email or password'
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
        <Logo height={Dimensions.get('screen').height / 3.5} source={{ uri: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-travel-logo.-travel-agency-adventure-creative-sign.-png-image_3628280.jpg' }} />
        <LoginForm
          onChange={onChangeHandler}
          email={form.email.value}
          password={form.password.value}
          onLogin={loginHandler}
          isLoading={loading}
          isDisabled={loginDisabled}
          emailState={form.email}
          passwordState={form.password}
        // onPress={}
        />
        {/* <View style={{ height: Dimensions.get('screen').height / 5.5, justifyContent: 'flex-end', }}>
          <LoginScreen.Footer label={'Register now'} onPress={() => this.props.navigation.navigate('SignUp')} />
        </View> */}
      </ScrollView>
    </View>
  )
}
