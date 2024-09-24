export function removeEmptyFields<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce<Partial<T>>((acc, [key, value]) => {
    // Проверяем, является ли значение объектом
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nestedObject = removeEmptyFields(value); // Рекурсивный вызов
      // Добавляем только если объект не пустой
      if (Object.keys(nestedObject).length > 0) {
        acc[key as keyof T] = nestedObject as T[keyof T]; // Приведение типа здесь
      }
    }
    // Проверяем, является ли значение непустым
    else if (value !== undefined && value !== null && value !== "" && (!Array.isArray(value) || value.length > 0)) {
      acc[key as keyof T] = value; // Добавляем непустое значение
    }
    return acc;
  }, {} as Partial<T>);
}
