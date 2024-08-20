import { GiStrong } from "react-icons/gi";
import { GrUserManager } from "react-icons/gr";
import { MdOnlinePrediction } from "react-icons/md";
import { RiContactsBook2Fill } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

export const MENU_CONTENT = [
  {
    title: "Онлайн ведение",
    link: "#online-training",
    icon: MdOnlinePrediction,
  },
  { title: "Обо мне", link: "#about", icon: GrUserManager },
  { title: "Результаты работы", link: "#results", icon: GiStrong },
  { title: "Отзывы клиентов", link: "#feedback", icon: VscFeedback },
  { title: "Контакты", link: "#contacts", icon: RiContactsBook2Fill },
];
