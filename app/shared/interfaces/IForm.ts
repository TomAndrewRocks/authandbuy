export interface IForm {
  name: string;
  email: string;
}

export interface IFormData {
  values: IForm;
  setValues: (newValues: Partial<IForm>) => void;
}
