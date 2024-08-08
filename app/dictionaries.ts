import "server-only";

const dictionaries = {
  en: async () => {
    const login = await import("@/i18n/en/login.json").then(
      (module) => module.default
    );
    return { login };
  },
  es: async () => {
    const login = await import("@/i18n/es/login.json").then(
      (module) => module.default
    );
    return { login };
  },
};

export const getDictionary = async (lng: string) => dictionaries[lng as keyof typeof dictionaries]();