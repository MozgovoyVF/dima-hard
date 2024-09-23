import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { FaCalculator, FaWeightScale } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import { GiStrong } from "react-icons/gi";
import { GrSettingsOption, GrUserManager } from "react-icons/gr";
import { IoFitnessSharp } from "react-icons/io5";
import { MdOnlinePrediction, MdOutlineAdminPanelSettings, MdOutlineModelTraining } from "react-icons/md";
import { PiKeyholeFill } from "react-icons/pi";
import { RiContactsBook2Fill } from "react-icons/ri";

export const MENU_CONTENT = [
  {
    title: "Онлайн ведение",
    link: "#online-training",
    icon: MdOnlinePrediction,
  },
  { title: "Составляющие тренировок со мной", link: "#training", icon: IoFitnessSharp },
  { title: "Программы тренировок и питания", link: "#programs", icon: MdOutlineModelTraining },
  { title: "Обо мне", link: "#about", icon: GrUserManager },
  { title: "Результаты работы", link: "#results", icon: GiStrong },
  { title: "Контакты", link: "#contacts", icon: RiContactsBook2Fill },
];

export const PROFILE_MENU_CONTENT = [
  {
    title: "Главная",
    link: "/",
    icon: MdOnlinePrediction,
  },
  {
    title: "Калькулятор калорий",
    link: DASHBOARD_PAGES.CALC,
    icon: FaCalculator,
  },
  {
    title: "Настройки",
    link: DASHBOARD_PAGES.SETTINGS,
    icon: GrSettingsOption,
  },
  {
    title: "FatSecret",
    link: DASHBOARD_PAGES.FATSECRET,
    icon: PiKeyholeFill,
  },
];

export const ADMIN_MENU_CONTENT = [
  {
    title: "Личный кабинет администратора",
    link: DASHBOARD_PAGES.ADMIN_MAIN,
    icon: MdOutlineAdminPanelSettings,
  },
  {
    title: "Показатели веса",
    link: DASHBOARD_PAGES.ADMIN_WEIGHT,
    icon: FaWeightScale,
  },
  {
    title: "Изменение данных пользователей",
    link: DASHBOARD_PAGES.ADMIN_USERS,
    icon: GrUserManager,
  },
  {
    title: "Настройки",
    link: DASHBOARD_PAGES.SETTINGS,
    icon: GrSettingsOption,
  },
];
