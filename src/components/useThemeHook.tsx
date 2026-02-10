import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";

export const useThemeHook = () => {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof document !== "undefined") {
			return document.documentElement.classList.contains("dark")
				? "dark"
				: "light";
		}
		return "light";
	});

	const setTheme = useCallback((newTheme: Theme) => {
		const root = document.documentElement;

		if (newTheme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		localStorage.setItem("theme", newTheme);
		setThemeState(newTheme);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(theme === "dark" ? "light" : "dark");
	}, [theme, setTheme]);

	useEffect(() => {
		const root = document.documentElement;

		const syncThemeFromDOM = () => {
			const isDark = root.classList.contains("dark");
			setThemeState(isDark ? "dark" : "light");
		};

		syncThemeFromDOM();

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "class"
				) {
					syncThemeFromDOM();
				}
			});
		});

		observer.observe(root, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return {
		theme,
		setTheme,
		toggleTheme,
	};
};
