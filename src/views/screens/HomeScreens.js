import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import COLORS from '../../contants/colors';
import Button from '../components/Button';

const HomeScreens = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();

  React.useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate('LoginScreen');
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreens;
