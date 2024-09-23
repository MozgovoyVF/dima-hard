export function convertDateToDays(dateString: string): number {
  // Разбиваем строку на день, месяц и год
  const [day, month, year] = dateString.split(".").map(Number);

  // Полный год (добавляем 2000, если год меньше 50, иначе 1900)
  const fullYear = year < 50 ? 2000 + year : 1900 + year;

  // Создаем дату из разбитых значений
  const targetDate = new Date(fullYear, month - 1, day); // Месяцы с 0

  // Определяем дату начала отсчета
  const startDate = new Date(1970, 0, 1);

  // Вычисляем разницу в миллисекундах и преобразуем в дни
  const daysDifference = Math.floor((targetDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));

  return daysDifference;
}
