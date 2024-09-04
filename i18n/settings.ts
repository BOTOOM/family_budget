

export const cookieName = "i18next";
export const defaultNS = "translation";
export const fallbackLng = "en";
export const languages = [fallbackLng, "es"];

export const i18nConfig = {
  locales: languages,
  defaultLocale: fallbackLng
};
export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}
