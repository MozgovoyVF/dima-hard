import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ITask } from "@/types/auth.types";
import Loader from "@/components/ui/loader/Loader";

interface ITaskItem {
  item: ITask;
  onToggleComplete: (userId: string, taskId: string, isComplete: boolean) => void;
  isPending: boolean;
}

const TaskItem = ({ item, onToggleComplete, isPending }: ITaskItem) => {
  // Локальное состояние для чекбокса, можно удалить если состояние будет передаваться из родительского компонента.
  const [isChecked, setIsChecked] = useState(item.completed);

  useEffect(() => {
    setIsChecked(item.completed);
  }, [item]);

  const handleCheckboxChange = () => {
    // Обновляем локальное состояние
    setIsChecked(!isChecked);

    // Вызов функции для обработки события
    onToggleComplete(item.userId, item.id, !isChecked);
  };

  return (
    <div className={`${styles.task} ${item.completed ? styles.completed : ""}`} key={item.id}>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <input
            className={styles.taskCheckbox}
            type="checkbox"
            id={`checkbox-${item.id}`}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`checkbox-${item.id}`} />
        </>
      )}
      <div className={styles.content}>
        <span className={styles.taskTitle}>{item.title}</span>
        <span className={styles.taskDescription}>{item.description}</span>
      </div>
    </div>
  );
};

export default TaskItem;
