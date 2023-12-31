import LayoutScreen from '@components/Layout';
import PinInput from '@components/PinInput';
import { usePinStore } from '@contexts/usePinStore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { z } from 'zod';

const pinSchema = z.string().length(4, { message: 'PIN must be 4 digits' });

export default function Security() {
  const { pin, setPin } = usePinStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { pin: '' },
  });

  const onSubmit = async (data: { pin: string }) => {
    try {
      await pinSchema.parseAsync(data.pin);
      setPin(data.pin);
    } catch (err) {
      console.error('Validation Error:', err);
    }
  };

  return (
    <LayoutScreen>
      <Text>Security</Text>
      <PinInput
        control={control}
        name="pin"
        pin={pin}
        setPin={setPin}
        onSubmit={handleSubmit(onSubmit)}
        error={errors.pin?.message}
      />
    </LayoutScreen>
  );
}
