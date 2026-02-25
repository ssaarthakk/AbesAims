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

export const useAttData = create((set) => ({
    attData: [],
    setAttData: (newData: any) => set({ attData: newData }),
    detailsVisible: false,
    setDetailsVisible: (visible: boolean) => set({ detailsVisible: visible }),
}));

export default useStore;