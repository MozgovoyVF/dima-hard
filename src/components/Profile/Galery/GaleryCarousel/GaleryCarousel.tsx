import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel.css";

// Импортируем модули Swiper для пагинации и навигации
import { Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import styles from "./index.module.scss";
import { RxCrossCircled } from "react-icons/rx";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdDeleteForever, MdPhotoSizeSelectLarge } from "react-icons/md";
import Loader from "@/components/ui/loader/Loader";

interface IGaleryCarousel {
  responsive: string[];
  handleDelete: (index: number) => void;
  showCounter?: boolean;
  isDeletePending?: boolean;
}

export default function GaleryCarousel({
  responsive,
  handleDelete,
  showCounter = true,
  isDeletePending = false,
}: IGaleryCarousel) {
  const [isOpen, setIsOpen] = useState(false); // состояние для открытия модального окна
  const [currentImage, setCurrentImage] = useState("");

  const handleImageClick = (src: string) => {
    setCurrentImage(src);
    setIsOpen(true); // открываем модальное окно
  };

  const closeModal = () => {
    setIsOpen(false); // закрываем модальное окно
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {showCounter && (
        <span className={`${styles.counter} ${responsive.length >= 4 && styles.max}`}>
          Загружено {responsive.length} фото из 4
        </span>
      )}
      <Swiper
        // slidesPerView={2} // Отображение 3 изображений одновременно
        spaceBetween={10} // Расстояние между изображениями
        navigation // Стрелки для навигации
        pagination={{ clickable: true }} // Пагинация (точки внизу)
        loop={true} // Бесконечный цикл слайдов
        modules={[Navigation, Pagination]} // Подключаем модули
        className={styles.mySwiper}
        breakpoints={{
          320: {
            slidesPerView: 1, // 1 слайд для экранов меньше 640px
          },
          480: {
            slidesPerView: 2, // 2 слайда для экранов 640px и выше
          },
          680: {
            slidesPerView: 3, // 3 слайда для экранов 768px и выше
          },
          1024: {
            slidesPerView: 4, // 4 слайда для экранов 1024px и выше
          },
        }}
      >
        {responsive.map((item, index) => (
          <SwiperSlide key={index} className={styles.swipItem}>
            <div className={styles.imgBox}>
              {isDeletePending ? (
                <span className={styles.loader}>
                  <Loader />
                </span>
              ) : (
                <span className={styles.cross} onClick={() => handleDelete(index)}>
                  <MdDeleteForever />
                </span>
              )}

              <span className={styles.size} onClick={() => handleImageClick(item)}>
                <MdPhotoSizeSelectLarge />
              </span>
              <span className={styles.number}>
                {index + 1} / {responsive.length}
              </span>
              <Image priority={true} width={300} height={300} src={item} alt="slides" className={styles.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Остановить всплытие клика */}
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            {/* Крестик для закрытия */}
            <Image
              priority={true}
              src={currentImage}
              alt="Full screen image"
              layout="fill" // Заполняем модальное окно
              objectFit="contain" // Сохраняем пропорции изображения
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
