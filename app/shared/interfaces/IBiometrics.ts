export interface IUserBiometrics {
  isUserAuth: boolean | any;
  hasBiometrics: boolean | any;
  isBiometricsChecked: boolean | any;
  setUserAuth: (val: boolean) => void;
  setUserBiometrics: (val: boolean) => void;
  setCheckBiometrics: (val: boolean) => void;
}
