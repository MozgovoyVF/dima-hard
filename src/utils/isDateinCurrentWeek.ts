import { IGalery } from "@/types/auth.types";

export function isDateInCurrentWeek(datesObj: Record<string, IGalery[]>) {
  const today = new Date();

  // Получаем текущий день недели (0 - воскресенье, 1 - понедельник и т.д.)
  const currentDayOfWeek = today.getDay();

  // Приводим Sunday к 7 для удобства работы с понедельником как началом недели
  const adjustedDay = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;

  // Находим понедельник текущей недели
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - adjustedDay + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  // Находим воскресенье текущей недели
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - adjustedDay));
  endOfWeek.setHours(23, 59, 59, 999);

  // Проверяем, есть ли дата среди ключей объекта
  return Object.keys(datesObj).some((dateStr) => {
    const date = new Date(dateStr);
    return date >= startOfWeek && date <= endOfWeek;
  });
}
