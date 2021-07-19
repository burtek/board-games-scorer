import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            trains: {
                header: 'Trains',
                button: '{{ count }} train',
                button_plural: '{{ count }} trains'
            },
            routes: {
                header: 'Routes'
            }
        }
    },
    pl: {
        translation: {
            trains: {
                header: 'Wagony',
                button_0: '{{ count }} wagon',
                button_1: '{{ count }} wagony',
                button_2: '{{ count }} wagonów'
            },
            routes: {
                header: 'Bilety'
            }
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false
    },
    keySeparator: '.'
});

export default i18n;
