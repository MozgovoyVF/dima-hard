import { useEffect, useState } from "react";

export const useSwipeMenu = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  let touchStartX = 0;
  let touchEndX = 0;

  const minSwipeDistance = 150; // минимальная дистанция для определения свайпа
  const minMoveThreshold = 30; // минимальное перемещение пальца для исключения случайного нажатия

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
    touchEndX = touchStartX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;

    // Проверяем, было ли реальное перемещение пальца
    if (Math.abs(swipeDistance) > minMoveThreshold) {
      if (swipeDistance > minSwipeDistance && isShowModal) {
        // Свайп влево - закрыть модальное окно
        setIsShowModal(false);
      } else if (swipeDistance < -minSwipeDistance && !isShowModal) {
        // Свайп вправо - открыть модальное окно
        setIsShowModal(true);
      }
    }
  };

  useEffect(() => {
    // Добавляем обработчики для событий
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Удаляем обработчики при размонтировании
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isShowModal]);

  return { isShowModal, setIsShowModal };
};
