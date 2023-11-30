import { zodResolver } from '@hookform/resolvers/zod';
import { IForm } from '@interfaces/IForm';
import { router } from 'expo-router';
import React from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';

import Input from './TextInput';
import { userFormSchema } from '../services/useLoginValidator';
import { useAuthStore } from '@contexts/useUserStore';
import useHaptics from '@utils/useHaptics';

function FormUser() {
  const userFormScheme = userFormSchema();
  const { setUserLogged } = useAuthStore();
  const { lightVibration } = useHaptics();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(userFormScheme),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const nameWatch = useWatch({
    control,
    name: 'name',
    defaultValue: '',
  });

  const emailWatch = useWatch({
    control,
    name: 'email',
    defaultValue: '',
  });

  const onSubmit = async (data: IForm) => {
    await lightVibration();
    setUserLogged(true);
    console.log(data);
  };

  const data: IForm = {
    email: emailWatch,
    name: nameWatch,
  };

  React.useEffect(() => {
    if (nameWatch || emailWatch) {
      setTimeout(() => {
        router.push('/shared/routes/drawer.routes');
        onSubmit(data);
        console.group(nameWatch, emailWatch);
      }, 1000);
    }
  }, [nameWatch, emailWatch]);

  return (
    <View style={{ gap: 30 }}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              label="Name"
              placeholder="Type your name"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
            {errors.name && (
              <HelperText type="error" visible>
                {errors.name.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Input
              label="E-mail"
              placeholder="Type your e-mail"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
            {errors.email && (
              <HelperText type="error" visible>
                {errors.email.message}
              </HelperText>
            )}
          </>
        )}
      />
    </View>
  );
}

export default FormUser;
