import { GiStrong } from "react-icons/gi";
import { GrUserManager } from "react-icons/gr";
import { IoFitnessSharp } from "react-icons/io5";
import { MdOnlinePrediction, MdOutlineModelTraining } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

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
  // { title: "Отзывы клиентов", link: "#feedback", icon: VscFeedback },
  { title: "Контакты", link: "#contacts", icon: RiContactsBook2Fill },
];
