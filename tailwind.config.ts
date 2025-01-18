import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        DarkGray: "#202123",
        MediumGray: "#343541",
        LightGray: "#444654",
        LightDaker: "#343540",
        SoftGray: "#9A9B9F",
        PaleGray: "#C5C5D1",
        OffWhite: "#ECECF1",
        White: "#FFFFFF",
        DarkGreen: "#0FA47F",
        TealGreen: "#00897B",
        LightGreen: "#8DCDB8",
        Purple: "#5536DA",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
