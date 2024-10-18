import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { BiFoodMenu } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { FaCalculator, FaWeightScale } from "react-icons/fa6";
import { GiStrong } from "react-icons/gi";
import { GrGallery, GrSettingsOption, GrUserManager } from "react-icons/gr";
import { IoFitnessSharp, IoSettings } from "react-icons/io5";
import { MdOnlinePrediction, MdOutlineAdminPanelSettings, MdOutlineModelTraining } from "react-icons/md";
import { PiKeyholeFill } from "react-icons/pi";
import { RiContactsBook2Fill, RiWeightFill } from "react-icons/ri";
import { TbRulerMeasure } from "react-icons/tb";

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
    title: "Задачи",
    link: DASHBOARD_PAGES.TASK,
    icon: FaTasks,
  },
  {
    title: "FatSecret",
    link: DASHBOARD_PAGES.FATSECRET,
    icon: PiKeyholeFill,
  },
  {
    title: "Галерея результатов",
    link: DASHBOARD_PAGES.GALERY,
    icon: GrGallery,
  },
  {
    title: "Антропометрия",
    link: DASHBOARD_PAGES.MEASURE,
    icon: TbRulerMeasure,
  },
  {
    title: "Настройки",
    link: DASHBOARD_PAGES.SETTINGS,
    icon: GrSettingsOption,
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
    icon: RiWeightFill,
  },
  {
    title: "Данные пользователей",
    link: DASHBOARD_PAGES.ADMIN_USERS,
    icon: GrUserManager,
  },
  {
    title: "Информация о питании",
    link: DASHBOARD_PAGES.ADMIN_FOOD_MONTH,
    icon: BiFoodMenu,
  },
  {
    title: "Задачи",
    link: DASHBOARD_PAGES.ADMIN_TASKS,
    icon: FaTasks,
  },
  {
    title: "Галерея результатов",
    link: DASHBOARD_PAGES.ADMIN_GALERY,
    icon: GrGallery,
  },
  {
    title: "Антропометрия",
    link: DASHBOARD_PAGES.ADMIN_MEASURE,
    icon: TbRulerMeasure,
  },
  {
    title: "Настройки",
    link: DASHBOARD_PAGES.SETTINGS,
    icon: IoSettings,
  },
];
