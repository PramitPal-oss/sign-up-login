import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import COLORS from '../../contants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
          },
        ]}
      >
        <Icon name={iconName} style={{ fontSize: 22, marginRight: 10 }} />
        <TextInput
          {...props}
          style={{ color: COLORS.darkBlue, flex: 1 }}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          secureTextEntry={hidePassword}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ fontSize: 22, color: COLORS.darkBlue }}
          />
        )}
      </View>
      {error && (
        <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
});

export default Input;
