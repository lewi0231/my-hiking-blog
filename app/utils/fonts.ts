import {
  Allerta,
  Assistant,
  Barlow,
  Inter,
  Montserrat,
  Noto_Serif,
  Poly,
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
export const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });
