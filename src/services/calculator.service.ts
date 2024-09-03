import { axiosClassic } from "@/app/api/interceptors";
import { BmiType, BmrType, CalculatorResponse, CalculatorType, IbwType, TdeeType } from "@/types/calculator.types";

const url = "https://gym-fit.p.rapidapi.com/v1/calculator";

export const calculatorService = {
  async getCalc(type: CalculatorType, data: TdeeType | IbwType | BmrType | BmiType) {
    const options = {
      params: data,
      headers: {
        "x-rapidapi-key": "0a83da140amsha4ff095778c813cp1408fcjsn66344b350eea",
        "x-rapidapi-host": "gym-fit.p.rapidapi.com",
      },
    };
    const response = await axiosClassic.get<CalculatorResponse>(`${url}/${type}`, options);

    return response;
  },

  // async getIbw(data: IbwType) {
  //   const options = {
  //     params: data,
  //     headers: {
  //       "x-rapidapi-key": "0a83da140amsha4ff095778c813cp1408fcjsn66344b350eea",
  //       "x-rapidapi-host": "gym-fit.p.rapidapi.com",
  //     },
  //   };
  //   const response = await axiosClassic.get<CalculatorResponse>(`${url}/ibw`, options);

  //   console.log(response.data);

  //   return response;
  // },

  // async getBmi(data: BmiType) {
  //   const options = {
  //     params: data,
  //     headers: {
  //       "x-rapidapi-key": "0a83da140amsha4ff095778c813cp1408fcjsn66344b350eea",
  //       "x-rapidapi-host": "gym-fit.p.rapidapi.com",
  //     },
  //   };
  //   const response = await axiosClassic.get<CalculatorResponse>(`${url}/bmi`, options);

  //   console.log(response.data);

  //   return response;
  // },

  // async getBmr(data: BmrType) {
  //   const options = {
  //     params: data,
  //     headers: {
  //       "x-rapidapi-key": "0a83da140amsha4ff095778c813cp1408fcjsn66344b350eea",
  //       "x-rapidapi-host": "gym-fit.p.rapidapi.com",
  //     },
  //   };
  //   const response = await axiosClassic.get<CalculatorResponse>(`${url}/bmr`, options);

  //   console.log(response.data);

  //   return response;
  // },
};
