export interface IUser {
  isUserLogged: boolean | any;
  userData: object;
  setUserData: (data: object) => void;
  setUserLogged: (val: boolean) => void;
}
