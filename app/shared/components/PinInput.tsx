// PinInput.tsx
import { Ionicons } from '@expo/vector-icons';
import { PinInputProps } from '@interfaces/IPin';
import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const PinInput: React.FC<PinInputProps> = ({ pin = '', setPin, length = 4 }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (inputs.current.length > 0) {
      inputs.current[0].focus();
    }
  }, []);

  const handlePinChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;

    const result = newPin.join('');
    setPin(result || '');

    if (value !== '' && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const renderPins = () => {
    return Array.from({ length }, (_, index) => (
      <TextInput
        key={index}
        style={styles.pinInput}
        keyboardType="numeric"
        maxLength={1}
        secureTextEntry={!showPassword}
        onChangeText={(text) => handlePinChange(text, index)}
        value={pin ? pin[index] : ''}
        ref={(input) => (inputs.current[index] = input as TextInput)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {renderPins()}
      <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
        <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    alignSelf: 'center',
    marginTop: 20,
  },
  pinInput: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  eyeIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default PinInput;
