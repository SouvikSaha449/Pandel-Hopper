import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export type Lang = 'en' | 'bn' | 'hi';

type PrefsState = {
    lang: Lang;
    onboarded : boolean;
    set: (partial: Partial<PrefsState>) => void
}

export const usePrefs = create<PrefsState>()(
    persist(
        (set) => ({
            lang:'en',
            onboarded:false,
            set: (partial) => set(partial)
        }),
        {
            name: 'pandal-hopper-prefs',
            storage: createJSONStorage(() => AsyncStorage),
        },
    )
)