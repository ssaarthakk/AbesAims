import { create } from 'zustand'
import { StudentData } from './apicalls';

const useStore = create((set) => ({
    userData: null,
    addUserData: (newObject: StudentData) => set({ userData: newObject }),
}));

export const useApiStore = create((set) => ({
    data: [],
    addData: (newData: any) => set({ data: newData }),
}));

export const useModalOpen = create((set) => ({
    isOpen: false,
    setIsOpen: (newData: any) => set({ isOpen: newData }),
}));

export default useStore;