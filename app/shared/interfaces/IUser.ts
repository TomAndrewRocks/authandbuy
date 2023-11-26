export interface IUser {
  isUserLogged: boolean | any;
  userID: string;
  setUserID: (id: string) => void;
  setUserLogged: (val: boolean) => void;
}
