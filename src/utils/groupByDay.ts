import { IGalery } from "@/types/auth.types";

export function groupByDay(items: IGalery[]) {
  return items.reduce((acc, item) => {
    // Извлекаем дату в формате "YYYY-MM-DD" из поля createdAt
    const date = new Date(item.createdAt).toISOString().split("T")[0];

    // Если в объекте еще нет этой даты, создаем пустой массив
    if (!acc[date]) {
      acc[date] = [];
    }

    // Добавляем текущий элемент в соответствующий массив
    acc[date].push(item);

    return acc;
  }, {} as Record<string, IGalery[]>); // Возвращаем объект с ключами-датами и значениями-массивами объектов
}
