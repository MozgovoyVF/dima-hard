import { IGalery } from "@/types/auth.types";

export function isDateInCurrentMonth(datesObj: Record<string, IGalery[]>) {
  const today = new Date();

  // Находим первый день текущего месяца
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Находим последний день текущего месяца
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  // Проверяем, есть ли дата среди ключей объекта в пределах текущего месяца
  return Object.keys(datesObj).some((dateStr) => {
    const date = new Date(dateStr);
    return date >= startOfMonth && date <= endOfMonth;
  });
}
