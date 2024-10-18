interface HasCreatedAt {
  createdAt: string | Date; // Указываем, что поле createdAt может быть строкой или объектом Date
}

export function groupByDay<T extends HasCreatedAt>(items: T[]) {
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
  }, {} as Record<string, T[]>); // Возвращаем объект с ключами-датами и значениями-массивами объектов
}
