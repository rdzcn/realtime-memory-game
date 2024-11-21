import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import translationEN from "./locales/en";

i18n.use(initReactI18next).init(
	{
		resources: {
			en: {
				translation: {
					...translationEN,
				},
			},
		},
		interpolation: {
			escapeValue: false,
		},
		defaultNS: "translation",
		lng: "en",
		fallbackLng: false,
	},
	(err) => {
		if (err) {
			return console.error("i18 error", err);
		}
	},
);

export default i18n;
