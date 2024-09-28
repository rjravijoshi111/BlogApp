import React from 'react';
import {View, TextInput, Text, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constant/colors';
import styles from './style';

interface CustomTextInputProps extends TextInputProps {
  iconName: string;
  errorMessage?: string | null;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  iconName,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Icon
          name={iconName}
          size={20}
          color={COLORS.iconColor}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.lightWhite}
          {...props}
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

export default CustomTextInput;
