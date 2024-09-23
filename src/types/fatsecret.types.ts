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
