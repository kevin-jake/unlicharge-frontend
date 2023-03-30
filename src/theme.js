// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CAFFCA",
    200: "#BDFFB0",
    300: "#ADFFAD",
    400: "#98FF98",
    500: "#7ACC7A",
    600: "#62A362",
    700: "#4E824E",
    800: "#325332",
    900: "#284228",
  },
  compliment: {
    50: "#d4edff",
    100: "#8097AA",
    200: "#385D7B",
    300: "#06355A",
    400: "#0B0E2A",
    500: "#0B1D2A",
    600: "#08151F",
    700: "#060F15",
    800: "#040B0F",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              darkest: colorTokens.primary[900],
              dark: colorTokens.primary[800],
              main: colorTokens.primary[500],
              light: colorTokens.primary[200],
              white: "white",
              request: "#000b5082",
              requestCompute: "#0035a366",
              selectedCompute: "#325332",
              selectedCat: "#296c29",
              selectedCard: "#296c29",
            },
            compliment: {
              dark: colorTokens.compliment[800],
              blueDark: colorTokens.compliment[700],
              main: colorTokens.compliment[500],
              light: colorTokens.primary[100],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
            error: { issues: "#533232", main: "#ffb5b5", light: "#5e0000" },
            warning: { issues: "#81702a", main: "#f7d984", light: "#503600" },
            info: {
              issues: "#314656",
              main: "#84c2f7",
              light: "#503600",
            },
          }
        : {
            // palette values for light mode
            primary: {
              darkest: colorTokens.primary[900],
              dark: colorTokens.primary[700],
              main: colorTokens.primary[800],
              light: colorTokens.primary[500],
              white: colorTokens.grey[800],
              request: "#98d6ffb0",
              requestCompute: "#7acaff",
              selectedCompute: "#7acc7a6e",
              selectedCat: "#296c29",
              selectedCard: "#87d98775",
            },
            compliment: {
              dark: colorTokens.compliment[100],
              blueDark: colorTokens.compliment[200],
              main: colorTokens.compliment[50],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
            error: { issues: "#ffc6c0", main: "#d32f2f", light: "#d32f2f" },
            warning: { issues: "#ffffc0", main: "#ff9800", light: "#ff9800" },
            info: { issues: "#c0f5ff", main: "#3498db", light: "#1d6670" },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
