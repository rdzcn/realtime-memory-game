import { type PropsWithChildren, createContext, useContext } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/shared/translations/init18n";
import translationEN from "@/shared/translations/locales/en";

interface TextContextI {
	texts: {
		[key: string]:
			| string
			| Record<string, unknown>
			| {
					id: string;
					label: string;
			  }[];
	};
}

const TextsContext = createContext<TextContextI | null>(null);

const useTexts = () => {
	const context = useContext(TextsContext);
	if (!context) {
		throw new Error("useTexts must be used within a TextProvider");
	}
	return context;
};

interface TxtProps {
	txtKey: string;
	options?: { [key: string]: string | number };
	className?: string;
}

export const Txt = ({
	txtKey,
	options = {},
	className = "",
	...rest
}: TxtProps) => {
	const { t } = useTranslation();

	return (
		<span className={className} {...rest}>
			{t(txtKey, options)}
		</span>
	);
};

type TextsProviderProps = PropsWithChildren<unknown>;

const TextsProvider = ({ children }: TextsProviderProps) => {
	const texts = { ...translationEN };
	const value: TextContextI = {
		texts,
	};
	return (
		<I18nextProvider i18n={i18n}>
			<TextsContext.Provider value={value}>{children}</TextsContext.Provider>
		</I18nextProvider>
	);
};

export { TextsProvider, useTexts };
