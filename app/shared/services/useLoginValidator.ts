import { z } from 'zod';

export const userFormSchema = () => {
  const userFormScheme = z.object({
    name: z
      .string()
      .nonempty('Name is required!')
      .min(10, '10 characters at least!')
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(' ');
      }),
    email: z.string().nonempty('E-mail is required!').email('Wrong e-mail format!').toLowerCase(),
  });
  return userFormScheme;
};
