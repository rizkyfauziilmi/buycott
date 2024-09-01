import { create } from "zustand";

interface SheetStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
