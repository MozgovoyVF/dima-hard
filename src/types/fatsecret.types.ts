export type TFatSecretMontsWeigth = {
  month: {
    day: [
      {
        date_int: string;
        weight_comment?: string;
        weight_kg: string;
      }
    ];
    from_date_int: string;
    to_date_int: string;
  };
};

export type TFatSecretMonthFood = {
  month: {
    day: [
      {
        calories: string;
        carbohydrate: string;
        date_int: string;
        fat: string;
        protein: string;
      }
    ];
    from_date_int: string;
    to_date_int: string;
  };
};

export type TFatSecretExercise = {
  month: {
    day: TFatSecretExerciseDate[];
    from_date_int: string;
    to_date_int: string;
  };
};
export type TFatSecretProfile = {
  profile: {
    goal_weight_kg: string;
    height_cm: string;
    height_measure: string;
    last_weight_comment: string;
    last_weight_date_int: string;
    last_weight_kg: string;
    weight_measure: string;
  };
};

export type TFatSecretExerciseDate = {
  calories: string;
  date_int: string;
};

export type TFatSecretDayFood = {
  food_entries: {
    food_entry: [
      {
        calcium: string;
        calories: string;
        carbohydrate: string;
        cholesterol: string;
        date_int: string;
        fat: string;
        fiber: string;
        food_entry_description: string;
        food_entry_id: string;
        food_entry_name: string;
        food_id: string;
        iron: string;
        meal: string;
        monounsaturated_fat: string;
        number_of_units: string;
        polyunsaturated_fat: string;
        potassium: string;
        protein: string;
        saturated_fat: string;
        serving_id: string;
        sodium: string;
        sugar: string;
        vitamin_a: string;
        vitamin_c: string;
      }
    ];
  };
};

export type TFatSecretFood = {
  calcium: string;
  calories: string;
  carbohydrate: string;
  cholesterol: string;
  date_int: string;
  fat: string;
  fiber: string;
  food_entry_description: string;
  food_entry_id: string;
  food_entry_name: string;
  food_id: string;
  iron: string;
  meal: string;
  monounsaturated_fat: string;
  number_of_units: string;
  polyunsaturated_fat: string;
  potassium: string;
  protein: string;
  saturated_fat: string;
  serving_id: string;
  sodium: string;
  sugar: string;
  vitamin_a: string;
  vitamin_c: string;
};
