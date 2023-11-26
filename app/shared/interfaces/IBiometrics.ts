export interface IUserBiometrics {
  isUserAuth: boolean | any;
  hasBiometrics: boolean | any;
  isBiometricsChecked: boolean | any;
  setUserAuth: () => void;
  setUserBiometrics: (val: boolean) => void;
  setCheckBiometrics: (val: boolean) => void;
}
