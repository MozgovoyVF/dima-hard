export function convertDaysToDate(days: number) {
  // Определяем дату начала отсчета
  const startDate = new Date(1970, 0, 1); // Январь 1970 года
  // Добавляем количество дней к начальной дате
  const targetDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

  // Форматируем дату в dd.mm.yy
  const day = String(targetDate.getDate()).padStart(2, "0");
  const month = String(targetDate.getMonth() + 1).padStart(2, "0"); // Месяцы с 0
  const year = String(targetDate.getFullYear()).slice(-2); // Получаем последние 2 цифры года

  return `${day}.${month}.${year}`;
}
