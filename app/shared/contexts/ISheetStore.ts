import { ISheet } from '@interfaces/ISheet';
import create from 'zustand';

export const useSheetStore = create<ISheet>((set) => ({
  isOpen: false,
  setIsOpen: (val) => set({ isOpen: val }),
}));
