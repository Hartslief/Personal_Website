// Tailwind v4 moves all theme customisation (colors, fonts, animations)
// into @theme inside globals.css — this file is only needed if you have
// plugins or content path overrides.
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
};

export default config;
