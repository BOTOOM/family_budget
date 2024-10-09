import "server-only";

const dictionaries = {
	en: async () => {
		const login = await import("@/i18n/en/login.json").then(
			(module) => module.default,
		);
		const navbar = await import("@/i18n/en/navbar.json").then(
			(module) => module.default,
		);
		const account = await import("@/i18n/en/account.json").then(
			(module) => module.default,
		);
		const common = await import("@/i18n/en/common.json").then(
			(module) => module.default,
		);
		const accountbalance = await import("@/i18n/en/accountbalance.json").then(
			(module) => module.default,
		);
		return { login, navbar, account, common, accountbalance };
	},
	es: async () => {
		const login = await import("@/i18n/es/login.json").then(
			(module) => module.default,
		);
		const navbar = await import("@/i18n/es/navbar.json").then(
			(module) => module.default,
		);
		const account = await import("@/i18n/es/account.json").then(
			(module) => module.default,
		);
		const common = await import("@/i18n/es/common.json").then(
			(module) => module.default,
		);
		const accountbalance = await import("@/i18n/es/accountbalance.json").then(
			(module) => module.default,
		);
		return { login, navbar, account, common, accountbalance };
	},
};

export const getDictionary = async (lng: string) => {
	if (lng !== "placeholder.svg") {
		return dictionaries[lng as keyof typeof dictionaries]();
	}
	return dictionaries.en();
};
