import { NextApiResponse } from "next";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: NextApiResponse) {
  const { body } = await req.json();

  const name = body.name ?? null;
  const phone = body.phone ?? null;
  const type = body.type ?? null;

  const transporter = nodemailer.createTransport({
    service: "gmail", // или другой сервис почты
    auth: {
      user: process.env.EMAIL_USER, // ваш email из переменных окружения
      pass: process.env.EMAIL_PASS, // ваш пароль приложения из переменных окружения
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "mozgovoy2796@gmail.com",
    subject: "Новая заявка с сайта",
    text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: Предпочтительный способ для коммуникации с клиентом - ${type}`,
  };

  try {
    if (name && phone && type) {
      try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: "Email успешно отправлен!" }), {
          status: 200,
        });
      } catch (error) {
        console.error("Ошибка при отправке email:", error);
        return new Response(JSON.stringify({ error: "Ошибка при отправке email" }), {
          status: 200,
        });
      }
    }
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }
}
