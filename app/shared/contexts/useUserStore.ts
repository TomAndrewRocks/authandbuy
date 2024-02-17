import { IUser } from "@interfaces/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<IUser>(
  persist(
    (set) => ({
      isUserLogged: true,
      userData: {},
      setUserData: (data) => set({ userData: data }),
      setUserLogged: (value: boolean) =>
        set(() => ({
          isUserLogged: value,
        })),
    }),
    {
      name: "auth-store",
      getStorage: () => AsyncStorage,
    }
  )
);
