import { IMeasure } from "@/types/auth.types";

export function groupByMeasures(items: IMeasure[]) {
  return items.reduce((acc, item) => {
    for (const [key, value] of Object.entries(item)) {
      if (!acc[key as keyof IMeasure]) {
        acc[key as keyof IMeasure] = [];
      }

      // Добавляем текущий элемент в соответствующий массив
      acc[key as keyof IMeasure].push(value);
    }

    return acc;
  }, {} as Record<keyof IMeasure, any[]>); // Возвращаем объект с ключами-датами и значениями-массивами объектов
}
