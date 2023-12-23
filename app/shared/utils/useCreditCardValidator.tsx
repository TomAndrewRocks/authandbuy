import creditCardType from 'credit-card-type';
import { Resolver } from 'react-hook-form';
import { z, ZodType } from 'zod';

export interface ValidationResult {
  values: any;
  errors: { cardNumber?: string };
}

export const useCreditCardValidator = (): Resolver<any> => {
  const cardValidator: ZodType<string> = z
    .string()
    .refine(
      (value) => {
        const cardInfo = creditCardType(value.replace(/\s/g, ''));
        return cardInfo.length > 0;
      },
      {
        message: 'Invalid credit card number',
      },
    )
    .refine(
      (value) => {
        const newValue = value.replace(/\s/g, '');
        return newValue.length === 16 && /^[0-9]+$/.test(newValue);
      },
      {
        message: 'Invalid credit card number format',
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
