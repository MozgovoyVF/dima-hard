import { TFatSecretDayFood, TFatSecretFood } from "@/types/fatsecret.types";

export function sortByMeal(result: TFatSecretDayFood) {
  return result.food_entries.food_entry.reduce((acc, item) => {
    // Если категории (приема пищи) еще нет в аккумуляторе, создаем её как пустой массив
    if (!acc[item.meal]) {
      acc[item.meal] = [];
    }

    // Добавляем текущий элемент в соответствующий массив
    acc[item.meal].push(item);

    return acc;
  }, {} as Record<string, TFatSecretFood[]>);
}
