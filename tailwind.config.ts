/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          amber:        "#C97B4B",
          "amber-light": "#E4A97A",
          "amber-dark":  "#A55E33",
          gold:          "#E8B872",
          "gold-light":  "#F5D78E",
          sage:          "#7A9B7A",
          "sage-light":  "#A8C4A0",
          "sage-dark":   "#567856",
          cream:         "#FAFAF5",
          sand:          "#F4EFE4",
          "sand-dark":   "#EDE7D9",
          warm:          "#F8F3EB",
          charcoal:      "#2A2520",
          "text-mid":    "#6B5F58",
          "text-light":  "#A09590",
        },
        marine: {
          DEFAULT: "#2E7A8F",
          deep:    "#091C27",
          dark:    "#142E3E",
          mid:     "#2E7A8F",
          light:   "#5BA3B0",
          pale:    "#C8E5EC",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body:    ['"Nunito"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up":         "fadeUp 0.8s ease forwards",
        "fade-in":         "fadeIn 0.6s ease forwards",
        "float":           "float 7s ease-in-out infinite",
        "float-slow":      "float 11s ease-in-out infinite",
        "drift":           "drift 9s ease-in-out infinite",
        "beam-pulse":      "beamPulse 6s ease-in-out infinite",
        "spin-very-slow":  "spin 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)"   },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":      { transform: "translateY(-14px)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0px) rotate(0deg)"   },
          "33%":      { transform: "translateX(9px) rotate(3deg)"   },
          "66%":      { transform: "translateX(-5px) rotate(-2deg)" },
        },
        beamPulse: {
          "0%, 100%": { opacity: "0.45" },
          "50%":      { opacity: "1"    },
        },
      },
    },
  },
  plugins: [],
};
