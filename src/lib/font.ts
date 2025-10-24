// src/theme/fonts.ts
import { Domine, Saira, Creepster, Amatic_SC, Parisienne, Poiret_One, Merriweather, Satisfy,  Cinzel, Courgette } from "next/font/google";

// Existing fonts
export const domine = Domine({ subsets: ["latin"], weight: ["400", "500", "700"] });
export const saira = Saira({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
export const creepster = Creepster({ subsets: ["latin"], weight: ["400"] });
export const amaticSC = Amatic_SC({ subsets: ["latin"], weight: ["400", "700"] });
export const parisienne = Parisienne({ subsets: ["latin"], weight: ["400"] });
export const poiretOne = Poiret_One({ subsets: ["latin"], weight: ["400"] });
export const merriweather = Merriweather({ subsets: ["latin"], weight: ["300", "400", "700"] });

// New fonts
export const satisfy = Satisfy({ subsets: ["latin"], weight: ["400"] });
export const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
export const courgette = Courgette({ subsets: ["latin"], weight: ["400"] });
