import { useEffect, useState } from "react";

export const useSwipeMenu = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    // Расстояние свайпа для определения направления
    const swipeDistance = touchStartX - touchEndX;

    // Определяем свайп вправо или влево
    if (swipeDistance > 150 && isShowModal) {
      // Свайп влево - закрыть модальное окно
      setIsShowModal(false);
    } else if (swipeDistance < -150 && !isShowModal) {
      // Свайп вправо - открыть модальное окно
      setIsShowModal(true);
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
