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
    attScrollOffset: 0,
    setAttScrollOffset: (offset: number) => set({ attScrollOffset: offset }),
    detailsVisible: false,
    setDetailsVisible: (visible: boolean) => set({ detailsVisible: visible }),
}));

export const usePagerStore = create((set) => ({
    activePagerPage: 0,
    setActivePagerPage: (page: number) => set({ activePagerPage: page }),
}));

export default useStore;