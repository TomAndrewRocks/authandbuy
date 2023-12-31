import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface PinInputProps {
  control: Control;
  name: string;
  pin: string;
  setPin: (newPin: string) => void;
  onSubmit: () => void;
  error?: string;
  length?: number;
}

const PinInput: React.FC<PinInputProps> = ({
  control,
  name,
  pin = '',
  setPin,
  onSubmit,
  error,
  length = 4,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (inputs.current.length > 0) {
      inputs.current[0]?.focus();
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
      <Controller
        key={index}
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.pinInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {
              field.onChange(text);
              handlePinChange(text, field.name.length); // Atualize o PIN conforme necessário
              if (text !== '' && field.name.length < length - 1) {
                inputs.current[field.name.length + 1]?.focus();
              }
              if (field.name.length === length - 1) {
                onSubmit(); // Submeta o formulário ao preencher todos os campos
              }
            }}
            value={pin ? pin[field.name.length] : ''}
            ref={(input) => (inputs.current[field.name.length] = input as TextInput)}
          />
        )}
        name={`${name}[${index}]`}
        defaultValue=""
        rules={{ required: 'PIN is required' }}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {renderPins()}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
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
