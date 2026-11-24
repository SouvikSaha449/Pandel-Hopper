import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Lang = 'en' | 'bn' | 'hi';

type PrefsState = {
  lang: Lang;
  onboarded: boolean;
  favourites: string[];
  savedRoutes: string[];
  set: (partial: Partial<PrefsState>) => void;
  toggleFavourite: (id: string) => void;
  toggleSavedRoute: (id: string) => void;
  clearFavourites: () => void;
};

export const usePrefs = create<PrefsState>()(
  persist(
    (set) => ({
      lang: 'en',
      onboarded: false,
      favourites: [],
      savedRoutes: [],

      set: (partial) => set(partial),

      toggleFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.includes(id)
            ? state.favourites.filter((x) => x !== id)
            : [...state.favourites, id],
        })),

      toggleSavedRoute: (id) =>
        set((state) => ({
          savedRoutes: state.savedRoutes.includes(id)
            ? state.savedRoutes.filter((x) => x !== id)
            : [...state.savedRoutes, id],
        })),

      clearFavourites: () => set({ favourites: [] }),
    }),
    {
      name: 'pandal-hopper-prefs',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);