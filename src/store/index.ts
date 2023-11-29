import { create } from 'zustand'


type AppState = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  isManager: boolean
};

export const useAppStore = create<AppState>((set) => ({
  imageUrl: '',
  setImageUrl: (url: string) => set(() => ({ imageUrl: url })),

  isManager: true
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}))

