import creditCardType from 'credit-card-type';
import { Resolver } from 'react-hook-form';
import { z, ZodType } from 'zod';

interface ValidationResult {
  values: any;
  errors: { cardNumber?: string };
}

export const useCreditCardValidator = (): Resolver<any> => {
  const cardValidator: ZodType<string> = z.string().refine(
    (value) => {
      const cardInfo = creditCardType(value);
      return cardInfo.length > 0;
    },
    {
      message: 'Invalid credit card number',
    },
  );

  return async (data): Promise<ValidationResult> => {
    try {
      const validatedData = await cardValidator.parseAsync(data.cardNumber);
      return {
        values: {
          ...data,
          cardNumber: validatedData,
        },
        errors: {},
      };
    } catch (error: any) {
      return {
        values: data,
        errors: {
          cardNumber: error.message,
        },
      };
    }
  };
};
