import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import COLORS from '../../contants/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    fullName: '',
    phone: '',
    password: '',
  });
  const [erros, setErros] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = function (params) {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handlerError('Please input email', 'email');
      valid = false;
    }

    if (!inputs.password) {
      valid = false;
      handlerError('Please input password', 'password');
    }
    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email === userData.email &&
          inputs.password === userData.password
        ) {
          AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...userData, loggedIn: true })
          );
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error', 'Invalid Details');
        }
      } else {
        Alert.alert('Error', 'User does not exists');
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prev) => ({ ...prev, [input]: text }));
  };

  const handlerError = (errMasg, input) => {
    setErros((prev) => ({ ...prev, [input]: errMasg }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
          Login
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            iconName="email-outline"
            label="Email"
            placeholder="Enter your Email address"
            onChangeText={(text) => handleOnChange(text, 'email')}
            error={erros.email}
            onFocus={() => {
              handlerError(null, 'email');
            }}
          />
          <Input
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your Password"
            password
            onChangeText={(text) => handleOnChange(text, 'password')}
            onFocus={() => {
              handlerError(null, 'password');
            }}
            error={erros.password}
          />
          <Button title="Login" onPress={validate} />
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
            }}
            onPress={() => navigation.navigate('RegistrationScreen')}
          >
            Don't have an account ? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
