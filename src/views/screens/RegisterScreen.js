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

const RegisterScreen = ({ navigation }) => {
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
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handlerError('Please input valid email', 'email');
      valid = false;
    }
    if (!inputs.fullName) {
      handlerError('Please input fullname', 'fullName');
      valid = false;
    }
    if (!inputs.phone) {
      handlerError('Please input phone', 'phone');
      valid = false;
    }
    if (!inputs.password) {
      handlerError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handlerError('Min password length of 5', 'password');
    }
    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert('Error', 'Something Went Wrong');
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
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
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
            iconName="account-outline"
            label="FullName"
            placeholder="Enter your fullname"
            onChangeText={(text) => handleOnChange(text, 'fullName')}
            onFocus={() => {
              handlerError(null, 'fullName');
            }}
            error={erros.fullName}
          />
          <Input
            iconName="phone-outline"
            label="Phone"
            placeholder="Enter your ph no"
            keyboardType="numeric"
            onChangeText={(text) => handleOnChange(text, 'phone')}
            onFocus={() => {
              handlerError(null, 'phone');
            }}
            error={erros.phone}
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
          <Button title="Register" onPress={validate} />
          <Text
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
            }}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            Already have account ? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
