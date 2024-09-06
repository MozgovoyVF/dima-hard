export type TdeeType = {
  activityLevel: "sedentary" | "lightlyActive" | "active" | "veryActive";
  desiredActivityLevel: "sedentary" | "lightlyActive" | "active" | "veryActive";
  gender: "male" | "female";
  age: string;
  weight: string;
  desired_weight: string;
  height: string;
};

export type IbwType = {
  height: string;
};

export type BmiType = {
  weight: string;
  height: string;
};

export type BmrType = {
  gender: "male" | "female";
  age: string;
  weight: string;
  height: string;
};

export type CalculatorResponse = {
  result: number;
};

export type CalculatorType = "tdee" | "bmi" | "bmr";
