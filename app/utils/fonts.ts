import {
  Allerta,
  Assistant,
  Barlow,
  East_Sea_Dokdo,
  Inter,
  Karla,
  Lobster,
  Montserrat,
  Noto_Serif,
  Poly,
  Raleway,
  Rubik_Dirt,
  Vollkorn,
} from "next/font/google";

export const inter = Inter({ weight: "400", subsets: ["latin"] });
export const rubik = Rubik_Dirt({ weight: "400", subsets: ["latin"] });
export const notoSerif = Noto_Serif({ subsets: ["latin"] });
export const assistant = Assistant({ subsets: ["latin"] });
export const poly = Poly({ weight: "400", subsets: ["latin"] });
export const barlow = Barlow({
  weight: ["100", "200", "300", "400"],
  subsets: ["latin"],
});
export const volkorn = Vollkorn({ weight: "400", subsets: ["latin"] });
export const allerta = Allerta({ weight: "400", subsets: ["latin"] });
export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--karla",
});
export const lobster = Lobster({
  weight: ["400"],
  subsets: ["latin"],
});
export const eastSeaDokdo = East_Sea_Dokdo({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--east-sea-dokdo",
});
export const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--raleway",
});
