import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import { getLocales } from 'expo-localization'
import { useCallback } from 'react'
import en from './en'
import bn from './bn'
import hi from './hi'
import { usePrefs, type Lang } from '@/store/prefs'

export const LANGS: {
    code: Lang,
    label: string,
    chip: string,
}[] = [
        { code: 'en', label: 'EN', chip: 'EN' },
        { code: 'bn', label: 'বাং', chip: 'বাং' },
        { code: 'hi', label: 'हिं', chip: 'हिं' },
    ]

export function initialLang(): Lang{
    const code = getLocales()[0]?.languageCode;
    return code === 'bn' || code === 'hi' ? code: 'en';
}

void i18n.use(initReactI18next).init({
    resources: {
        en: {translation: en},
        bn: {translation: bn},
        hi: {translation: hi},
    },
    lng: initialLang(),
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
})

export function setLanguage(lang: Lang){
    usePrefs.getState().set({lang});
    void i18n.changeLanguage(lang);
}

usePrefs.persist.onFinishHydration((state) => {
    if(state.lang && state.lang != i18n.language){
        void i18n.changeLanguage(state.lang)
    }
})

export function nextLang(lang: Lang):Lang {
    return lang === 'en' ? 'bn' : lang === 'bn' ? 'hi' : 'en';
}

export function useNumber(){
    const lang = usePrefs((s) => s.lang);
    return useCallback(
        (n:number | string) => {
            const s = String(n);
            return lang === 'bn' ? s.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : s;
        },[lang])
}

export {useTranslation}
export default i18n
