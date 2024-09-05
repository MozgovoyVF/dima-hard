import { axiosClassic } from "@/app/api/interceptors";
import { BmiType, BmrType, CalculatorResponse, CalculatorType, IbwType, TdeeType } from "@/types/calculator.types";
import prisma from "./prisma.service";

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

  async saveResult(type: CalculatorType, result: number, userId: string) {
    return prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        [type]: result,
      },
      select: {
        id: true,
      },
    });
  },
};
