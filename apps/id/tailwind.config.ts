import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(187, 56%, 50%)",
          on: {
            DEFAULT: "hsl(187, 56%, 95%)",
            variant: "hsl(187, 56%, 92%)",
            variant2: "hsl(187, 56%, 89%)",
          },
          container: {
            lowest: "hsl(187, 56%, 96%)",
            low: "hsl(187, 56%, 90%)",
            DEFAULT: "hsl(187, 56%, 84%)",
            high: "hsl(187, 56%, 79%)",
            highest: "hsl(187, 56%, 73%)",
            on: "hsl(187, 56%, 25%)",
          },
        },
        // Surface colors are used for
        // low emphasis components, such as surfaces, dividers, and backgrounds.
        surface: {
          DEFAULT: "hsl(0, 0, 98%)",
          dim: "hsl(0, 0, 90%)",
          bright: "hsl(0, 0, 100%)",
          inverse: {
            DEFAULT: "hsl(0, 0, 15%)",
            on: "hsl(0, 0, 95%)",
          },
          on: {
            DEFAULT: "hsl(252, 20%, 10%)",
            variant: "hsl(252, 2%, 35%)",
            variant2: "hsl(252, 2%, 55%)",
          },
          container: {
            DEFAULT: "hsl(0, 0, 94%)",
            lowest: "hsl(0, 0, 100%)",
            low: "hsl(0, 0, 97%)",
            high: "hsl(0, 0, 91%)",
            highest: "hsl(0, 0, 88%)",
          },
          dark: {
            DEFAULT: "hsl(3, 3%, 10%)",
            low: "hsl(3, 3%, 12%)",
            on: {
              DEFAULT: "hsl(3, 3%, 90%)",
              variant: "hsl(3, 3%, 80%)",
            },
          },
        },
        outline: {
          lowest: "hsl(0, 0%, 85%)",
          low: "hsl(0, 0%, 70%)",
          DEFAULT: "hsl(0, 0%, 55%)",
          high: "hsl(0, 0%, 40%)",
          highest: "hsl(0, 0%, 25%)",
        },
        brand: {
          discord: {
            blauolett: "hsl(235, 86%, 65%)",
          },
        },
      },
      spacing: {
        xss: "0.25rem",
        xs: "0.50rem",
        sm: "0.75rem",
        md: "1.00rem",
        lg: "1.25rem",
        xl: "1.50rem",
        "2xl": "1.75rem",
        "3xl": "2.00rem",
        "4xl": "2.25rem",
        "5xl": "2.50rem",
        "6xl": "2.75rem",
      },
      fontFamily: {
        body: ["Inter", ...defaultTheme.fontFamily.sans],
        headline: ["Reddit Sans", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bordered: `0px 0px 0px 3px`,
      },
    },
    fontWeight: {
      thin: "100",
      light: "200",
      normal: "400",
      medium: "500",
      semi: "600",
      bold: "700",
      black: "900",
    },
    borderRadius: {
      none: "0",
      sm: "4px",
      DEFAULT: "8px",
      md: "12px",
      lg: "16px",
      xl: "28px",
      full: "9999px",
    },
    fontSize: {
      // See https://m3.material.io/styles/typography/type-scale-tokens for more information
      // Display fonts are used for large headlines and are typically used at the top of the page.
      "display-lg": ["5rem", { fontWeight: "900" }],
      display: ["4.1rem", { fontWeight: "900" }],
      "display-sm": ["3.429rem", { fontWeight: "900" }],
      // Headline fonts are used for headlines whenever a display font was already used (should never be used as the main title)
      "headline-lg": ["2.9rem", { fontWeight: "700" }],
      headline: ["1.95rem", { fontWeight: "700" }],
      "headline-sm": ["1.5rem", { fontWeight: "700" }],
      // Body fonts are used for the main text of any component
      "body-lg": ["1.22rem", {}],
      body: ["1rem", {}],
      "body-sm": ["0.88rem", {}],
      // Label fonts are used for small text (e.g. labels, captions, etc.)
      "label-lg": ["0.8rem", {}],
      label: ["0.75rem", {}],
      "label-sm": ["0.7rem", {}],
    },
  },
};

export default config;
