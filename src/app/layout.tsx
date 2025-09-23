"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme";
import "./globals.css";

// Import Google Fonts
import { Domine, Saira, Satisfy, Exo, Creepster, Amatic_SC, Parisienne, Poiret_One, Open_Sans, Merriweather, Lato } from "next/font/google";

const domine = Domine({ subsets: ["latin"], weight: ["400", "500", "700"] });
const saira = Saira({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });
const exo = Exo({ subsets: ["latin"], weight: ["400", "600", "700"] });
const creepster = Creepster({ subsets: ["latin"], weight: "400" });
const amatic = Amatic_SC({ subsets: ["latin"], weight: ["400", "700"] });
const parisienne = Parisienne({ subsets: ["latin"], weight: "400" });
const poiret = Poiret_One({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${domine.className} ${saira.className}`}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
